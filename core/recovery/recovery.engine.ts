import Redis from "ioredis"
import { addJob } from "../queue/redis.queue"

const redis = new Redis()

const STUCK_TIME = 60 * 1000 // 60 sec threshold

export async function runRecovery() {

  console.log("♻️ CRASH RECOVERY STARTED")

  const processing = await redis.lrange("queue:processing", 0, -1)

  for (const item of processing) {

    const job = JSON.parse(item)

    const age = Date.now() - (job.startedAt || Date.now())

    // =========================
    // STUCK JOB DETECTION
    // =========================
    if (age > STUCK_TIME) {

      console.log("🔁 RECOVERING JOB:", job.url)

      // remove from processing
      await redis.lrem(
        "queue:processing",
        1,
        item
      )

      // requeue safely
      await addJob(job)
    }
  }

  console.log("🏁 RECOVERY COMPLETE")
}
