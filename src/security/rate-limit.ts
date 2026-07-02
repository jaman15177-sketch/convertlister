import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

/**
 * ==========================================================
 * SIMPLE TOKEN BUCKET RATE LIMITER
 * ==========================================================
 */

export async function rateLimiter(organizationId: string): Promise<boolean> {
  const key = `rl:${organizationId}`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, 60); // 1 minute window
  }

  // limit = 120 req/min per tenant
  if (current > 120) {
    return false;
  }

  return true;
}
