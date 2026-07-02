import { getRedis } from "@/lib/redis";

/**
 * 📊 Track Usage
 */
export async function trackUsage(
  userId: string,
  type: string,
  cost: number = 1
) {
  const redis = getRedis();

  if (!redis) return;

  await redis.incrby(
    `usage:${userId}:${type}`,
    cost
  );
}

/**
 * 📈 Get Usage Snapshot
 */
export async function getUsage(
  userId: string
): Promise<Record<string, number>> {
  const redis = getRedis();

  if (!redis) {
    return {};
  }

  const keys = await redis.keys(
    `usage:${userId}:*`
  );

  const usage: Record<string, number> = {};

  for (const key of keys) {
    const value = await redis.get(key);

    const metric =
      key.split(":").pop() || key;

    usage[metric] = Number(value || 0);
  }

  return usage;
}

/**
 * 💰 Revenue Calculator
 */
export async function calculateRevenue(
  userId: string
) {
  const usage = await getUsage(userId);

  const totalUnits = Object.values(
    usage
  ).reduce(
    (sum, value) => sum + value,
    0
  );

  const revenue = totalUnits * 0.01;

  return {
    userId,
    totalUnits,
    revenue,
  };
}

/**
 * 🧾 Invoice Generator
 */
export async function generateInvoice(
  userId: string
) {
  const usage = await getUsage(userId);

  const total = Object.values(
    usage
  ).reduce(
    (sum, value) => sum + value,
    0
  );

  return {
    userId,
    usage,
    total,
  };
}
