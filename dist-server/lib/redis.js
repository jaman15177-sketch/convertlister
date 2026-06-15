"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
/**
 * 🧠 Singleton Redis client (BullMQ / cache / queue)
 * Prevents multiple connections in dev + serverless issues
 */
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
    throw new Error("❌ REDIS_URL is missing in environment variables");
}
/**
 * Reuse connection in dev to avoid multiple instances
 */
exports.redis = global._redis ||
    new ioredis_1.Redis(REDIS_URL, {
        maxRetriesPerRequest: null,
        enableReadyCheck: true,
        lazyConnect: false,
    });
if (process.env.NODE_ENV !== "production") {
    global._redis = exports.redis;
}
/**
 * Optional logging (safe for debugging)
 */
exports.redis.on("connect", () => {
    console.log("🟢 Redis connected");
});
exports.redis.on("error", (err) => {
    console.error("🔴 Redis error:", err.message);
});
