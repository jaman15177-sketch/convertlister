import { updateJobState } from "../state/job.state";
import { acquireLock, releaseLock } from "../idempotency/idempotency.engine";
import { getNextJob } from "../queue/queue.engine";

type WorkerConfig = {
  concurrency: number;
  retryLimit: number;
  intervalMs: number;
};

export function startWorkerPool(config: WorkerConfig) {
  console.log("🚀 Worker Pool Starting...");

  for (let i = 0; i < config.concurrency; i++) {
    runWorker(`worker-${i + 1}`, config);
  }
}

async function runWorker(workerId: string, config: WorkerConfig) {
  console.log(`[${workerId}] Online`);

  setInterval(async () => {
    const job = await getNextJob();
    if (!job) return;

    const locked = acquireLock(job.id);
    if (!locked) return;

    console.log(`[${workerId}] Processing:`, job.id);

    let attempts = 0;

    await updateJobState(job.id, "running");

    while (attempts < config.retryLimit) {
      try {
        attempts++;

        // ⚙️ Simulated pipeline execution
        await executePipeline(job);

        await updateJobState(job.id, "completed", {
          attempts,
        });

        releaseLock(job.id);

        console.log(`[${workerId}] Completed:`, job.id);
        return;
      } catch (err) {
        console.log(`[${workerId}] Retry ${attempts} failed`);

        if (attempts >= config.retryLimit) {
          await updateJobState(job.id, "failed", {
            attempts,
          });

          releaseLock(job.id);
          return;
        }
      }
    }
  }, config.intervalMs);
}

async function executePipeline(job: any) {
  console.log("⚙️ Running Pipeline:", job.payload);

  // simulate real work
  await new Promise((res) => setTimeout(res, 1200));

  // random failure simulation (optional)
  if (Math.random() < 0.1) {
    throw new Error("Random pipeline failure");
  }

  console.log("✅ Pipeline Done:", job.id);
}
export async function startWorker() {
  console.log("🚀 Worker started (stub mode)");

  return {
    success: true,
    message: "worker running in stub mode",
  };
}
