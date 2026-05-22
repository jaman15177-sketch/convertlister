import { redis } from "../../../lib/redis";

/**
 * =========================
 * JOB CORE TYPE
 * =========================
 */
export interface Job {
  id: string;
  type: string;
  userId: string;

  payload: any;

  status: "queued" | "processing" | "completed" | "failed";

  attempts: number;
  maxAttempts: number;

  createdAt: number;
  updatedAt?: number;

  failedReason?: string;
}

/**
 * =========================
 * ADD JOB (QUEUE PUSH)
 * =========================
 */
export async function addJob(
  job: Omit<
    Job,
    "status" | "createdAt" | "updatedAt" | "attempts" | "failedReason"
  >
): Promise<string> {
  const fullJob: Job = {
    ...job,
    status: "queued",
    attempts: 0,
    createdAt: Date.now(),
  };

  await redis.lpush("job_queue", JSON.stringify(fullJob));

  return fullJob.id;
}

/**
 * =========================
 * GET NEXT JOB (QUEUE POP)
 * =========================
 */
export async function getNextJob(): Promise<Job | null> {
  const raw = await redis.rpop("job_queue");

  if (!raw) return null;

  try {
    if (typeof raw !== "string") {
      return JSON.parse(JSON.stringify(raw));
    }

    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to parse job:", raw);
    return null;
  }
}

/**
 * =========================
 * QUEUE LENGTH
 * =========================
 */
export async function queueLength(): Promise<number> {
  const len = await redis.llen("job_queue");
  return Number(len || 0);
}

/**
 * =========================
 * UPDATE JOB STATE (FUTURE SAFETY HOOK)
 * =========================
 */
export async function updateJob(job: Job): Promise<void> {
  await redis.hset(`job:${job.id}`, {
    ...job,
    updatedAt: Date.now(),
  });
}
