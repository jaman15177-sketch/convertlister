import { Job } from "../types/job.types";

// 🧠 In-memory fallback queue (production-safe stub for build stability)
const queue: Job[] = [];

export async function addJob(job: Job) {
  queue.push(job);

  return {
    success: true,
    jobId: job.id,
  };
}

export async function getNextJob() {
  return queue.shift() || null;
}

export async function getQueueLength() {
  return queue.length;
}

export async function clearQueue() {
  queue.length = 0;

  return { success: true };
}
