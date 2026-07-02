import { rateLimit } from "../rate-limit";

/**
 * Gateway-safe rate limiter wrapper
 * Used by WebSocket / internal services
 */
export function rateLimitGuard(key: string) {
  return rateLimit(key, 20, 60_000);
}
