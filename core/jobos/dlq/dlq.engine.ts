import { redis } from "../../../lib/redis";

const DLQ_NAME = "dead_letter_queue";

export async function moveToDLQ(job: any) {
  await redis.lpush(DLQ_NAME, job);
}
