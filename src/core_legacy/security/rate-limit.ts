import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

export class RateLimiter {
  async check(key: string, limit: number, windowSec: number) {
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowSec);
    }

    if (current > limit) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }

    return {
      allowed: true,
      remaining: Math.max(0, limit - current),
    };
  }
}

export const rateLimiter = new RateLimiter();
