import Redis from "ioredis"

const redis = new Redis()

const TTL = 60 * 60 // 1 hour

/**
 * CHECK + LOCK (ATOMICS)
 */
export async function isDuplicate(urlHash: string): Promise<boolean> {

  const exists = await redis.exists(`dedupe:${urlHash}`)

  return exists === 1
}

/**
 * REGISTER JOB (LOCK KEY)
 */
export async function registerJob(urlHash: string) {

  await redis.set(
    `dedupe:${urlHash}`,
    "1",
    "EX",
    TTL
  )
}

/**
 * REMOVE (optional cleanup)
 */
export async function clearJob(urlHash: string) {

  await redis.del(`dedupe:${urlHash}`)
}
