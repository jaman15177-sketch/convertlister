import { Queue, Worker, Job } from "bullmq";

/**
 * ==========================================================
 * ENTERPRISE QUEUE SYSTEM (BULLMQ)
 * ==========================================================
 */

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
};

// -----------------------------
// QUEUE INSTANCE
// -----------------------------
export const jobQueue = new Queue("enterprise-jobs", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

// -----------------------------
// PRODUCER
// -----------------------------
export async function addJob(
  name: string,
  data: Record<string, unknown>
): Promise<Job> {
  return jobQueue.add(name, data);
}

// -----------------------------
// WORKER
// -----------------------------
export function startWorker(): Worker {
  const worker = new Worker(
    "enterprise-jobs",
    async (job: Job) => {
      console.log("⚙ Processing Job:", job.name);

      switch (job.name) {
        case "IMPORT":
          return handleImport(job.data);

        case "SCORE":
          return handleScore(job.data);

        default:
          console.warn("Unknown job:", job.name);
          return null;
      }
    },
    {
      connection,
      concurrency: 5,
    }
  );

  worker.on("completed", (job) => {
    console.log("✅ Job Completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.error("❌ Job Failed:", job?.id, err.message);
  });

  console.log("🚀 Queue Worker Started");

  return worker;
}

// -----------------------------
// HANDLERS
// -----------------------------
async function handleImport(data: unknown) {
  return {
    status: "imported",
    data,
  };
}

async function handleScore(data: unknown) {
  return {
    status: "scored",
    score: Math.random() * 100,
    data,
  };
}
