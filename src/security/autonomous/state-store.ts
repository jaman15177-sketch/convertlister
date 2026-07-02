import { getRedis } from "@/lib/redis";

export async function saveRiskState(
  userId: string,
  risk: number
) {
  const redis = getRedis();

  if (!redis) return;

  await redis.set(
    `risk:${userId}`,
    JSON.stringify({
      risk,
      updatedAt: Date.now(),
    })
  );
}

export async function loadRiskState(
  userId: string
) {
  const redis = getRedis();

  if (!redis) return null;

  const data = await redis.get(
    `risk:${userId}`
  );

  if (!data) {
    return null;
  }

  return JSON.parse(
    String(data)
  );
}
