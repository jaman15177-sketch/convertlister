const memoryStore = new Map<string, number>();

/**
 * Simple in-memory rate limiter
 * (upgrade later to Redis in production)
 */
export function rateLimit(userId: string, limit = 10, windowMs = 60000) {
  const now = Date.now();

  const user = memoryStore.get(userId);

  if (!user) {
    memoryStore.set(userId, now);
    return true;
  }

  const diff = now - user;

  if (diff < windowMs && limit <= 0) {
    return false;
  }

  memoryStore.set(userId, now);
  return true;
}
