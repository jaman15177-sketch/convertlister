import Redis from "ioredis"
import { Job } from "../types/job.types"
import { enforceRateLimit } from "../rate/queue.rate"

const redis = new Redis()

// ==========================
// ADD JOB
// ==========================
export async function addJob(job: Job) {

  // ==========================
  // RATE LIMIT PROTECTION
  // ==========================
  await enforceRateLimit()

  // ==========================
  // IDEMPOTENCY CHECK
  // ==========================
  const exists = await redis.get(
    `dedupe:${job.urlHash}`
  )

  if (exists) {

    console.log(
      "⚠️ DUPLICATE BLOCKED:",
      job.url
    )

    return
  }

  // ==========================
  // REGISTER DEDUPE
  // ==========================
  await redis.set(
    `dedupe:${job.urlHash}`,
    "1"
  )

  // ==========================
  // PUSH TO QUEUE
  // ==========================
  await redis.lpush(
    "queue:jobs",
    JSON.stringify(job)
  )

  console.log(
    "📥 JOB ACCEPTED:",
    job.url
  )
}

// ==========================
// FETCH NEXT JOB
// ==========================
export async function getNextJob():
Promise<Job | null> {

  const job = await redis.brpoplpush(
    "queue:jobs",
    "queue:processing",
    0
  )

  return job
    ? JSON.parse(job)
    : null
}

// ==========================
// ACKNOWLEDGE JOB
// ==========================
export async function acknowledgeJob(
  job: Job
) {

  await redis.lrem(
    "queue:processing",
    1,
    JSON.stringify(job)
  )

  console.log(
    "✅ ACK DONE:",
    job.url
  )
}
export async function popJob() {
  const job = await redis.brpoplpush(
    "queue:jobs",
    "queue:processing",
    0
  )

  return job ? JSON.parse(job) : null
}
