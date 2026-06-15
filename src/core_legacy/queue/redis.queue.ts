// 🧠 Lightweight in-memory queue (MVP / fallback layer)
// ⚠️ Replace with Redis/BullMQ later for scale

export type JobStatus = "pending" | "processing" | "done" | "failed";

export type Job = {
  id: string;
  type: string;
  payload: any;
  status?: JobStatus;
  createdAt?: string;
};

const queue: Job[] = [];

/**
 * Add job to queue
 */
export async function addJob(job: Job) {
  queue.push({
    ...job,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    jobId: job.id,
    queueSize: queue.length,
  };
}

/**
 * Get next job (FIFO)
 */
export async function getNextJob(): Promise<Job | null> {
  const job = queue.shift();

  if (!job) return null;

  job.status = "processing";
  return job;
}

/**
 * Get queue size
 */
export async function getQueueLength(): Promise<number> {
  return queue.length;
}

/**
 * Clear all jobs (dev only)
 */
export async function clearQueue() {
  queue.length = 0;

  return {
    success: true,
    message: "Queue cleared",
  };
}

/**
 * Debug helper
 */
export function getAllJobs(): Job[] {
  return [...queue];
}
