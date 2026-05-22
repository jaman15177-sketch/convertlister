// core/rate/queue.rate.ts

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const memoryStore = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_LIMIT = 10; // per minute fallback

export async function enforceRateLimit(
  key: string,
  limit: number = DEFAULT_LIMIT
): Promise<RateLimitResult> {
  const now = Date.now();

  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + 60 * 1000;

    memoryStore.set(key, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      remaining: limit - 1,
      resetAt,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

export async function resetRateLimit(key: string) {
  memoryStore.delete(key);

  return { success: true };
}
