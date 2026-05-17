import Redis from "ioredis"
import { Job } from "../job/job"

const redis = new Redis()

/**
 * MOVE JOB TO DEAD LETTER QUEUE
 */
export async function moveToDLQ(job: Job, reason: string) {

  const dlqJob = {
    ...job,
    failedAt: Date.now(),
    reason
  }

  await redis.lpush(
    "queue:dlq",
    JSON.stringify(dlqJob)
  )

  console.log("💀 MOVED TO DLQ:", job.url, reason)
}
