import { Redis } from "ioredis";

/**
 * 🧠 Singleton Redis client (BullMQ / cache / queue)
 * Prevents multiple connections in dev + serverless issues
 */

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("❌ REDIS_URL is missing in environment variables");
}

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

/**
 * Reuse connection in dev to avoid multiple instances
 */
export const redis =
  global._redis ||
  new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    lazyConnect: false,
  });

if (process.env.NODE_ENV !== "production") {
  global._redis = redis;
}

/**
 * Optional logging (safe for debugging)
 */
redis.on("connect", () => {
  console.log("🟢 Redis connected");
});

redis.on("error", (err) => {
  console.error("🔴 Redis error:", err.message);
});
