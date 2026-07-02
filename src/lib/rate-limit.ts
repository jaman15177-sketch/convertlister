/**
 * Enterprise Rate Limiter (Redis-ready + in-memory fallback)
 * - Works locally without Redis
 * - Automatically upgrades to Redis/Upstash if configured
 */

type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetTime: number;
};

const memoryStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute default window

let redis: any = null;

/**
 * Lazy-load Redis (Upstash compatible)
 */
async function getRedis() {
  if (redis) return redis;

  try {
    const { Redis } = await import("@upstash/redis");

    redis = Redis.fromEnv();
    return redis;
  } catch {
    redis = null;
    return null;
  }
}

/**
 * Core Rate Limit Function
 */
export async function rateLimit(
  key: string,
  limit = 10,
  windowMs = WINDOW_MS
): Promise<RateLimitResult> {
  const now = Date.now();

  const r = await getRedis();

  // =========================
  // REDIS MODE (PRODUCTION)
  // =========================
  if (r) {
    const redisKey = `rate-limit:${key}`;

    const current = await r.incr(redisKey);

    if (current === 1) {
      await r.expire(redisKey, Math.ceil(windowMs / 1000));
    }

    const ttl = await r.ttl(redisKey);

    return {
      success: current <= limit,
      remaining: Math.max(limit - current, 0),
      resetTime: now + ttl * 1000,
    };
  }

  // =========================
  // MEMORY MODE (DEV ONLY)
  // =========================
  const record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  record.count += 1;

  memoryStore.set(key, record);

  return {
    success: record.count <= limit,
    remaining: Math.max(limit - record.count, 0),
    resetTime: record.resetAt,
  };
}
