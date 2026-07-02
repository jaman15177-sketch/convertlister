import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * ==========================================================
 * DISTRIBUTED RATE LIMITER (ENTERPRISE GRADE)
 * ==========================================================
 * - Works across multiple servers
 * - Survives restart
 * - DDoS resistant
 * ==========================================================
 */

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
});

export async function rateLimitGuard(key: string) {
  const result = await ratelimit.limit(key);

  return {
    success: result.success,
    remaining: result.remaining,
  };
}
