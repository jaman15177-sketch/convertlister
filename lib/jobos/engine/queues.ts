import { redis } from "@/lib/redis";

const QUEUES = {
  high: "queue:high",
  medium: "queue:medium",
  low: "queue:low",
};

export async function pushJob(priority: string, job: any) {
  await redis.lpush(QUEUES[priority as keyof typeof QUEUES], JSON.stringify(job));
}

export async function popJob(priority: string) {
  const raw = await redis.rpop(QUEUES[priority as keyof typeof QUEUES]);
  return raw ? JSON.parse(raw) : null;
}
