import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export async function acquireLock(key: string, ttl = 5000) {
  const lockKey = `lock:${key}`;

  const result = await redis.set(lockKey, "1", "PX", ttl, "NX");

  return result === "OK";
}

export async function releaseLock(key: string) {
  await redis.del(`lock:${key}`);
}
