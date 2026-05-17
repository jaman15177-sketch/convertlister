import Redis from "ioredis"

const redis = new Redis()

// ==========================
// CONFIG
// ==========================
const MAX_QUEUE_SIZE = 500

// ==========================
// CHECK QUEUE CAPACITY
// ==========================
export async function canAcceptJob(): Promise<boolean> {

  const size = await redis.llen("queue:jobs")

  console.log("📊 QUEUE SIZE:", size)

  return size < MAX_QUEUE_SIZE
}

// ==========================
// OVERLOAD PROTECTION
// ==========================
export async function enforceRateLimit() {

  const allowed = await canAcceptJob()

  if (!allowed) {

    throw new Error("QUEUE_OVERLOADED")
  }
}
