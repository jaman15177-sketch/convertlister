import { productQueue } from "@/core/queue/queue.client";

export class QueueWorker {
  static start() {
    console.log("[WORKER] Starting queue worker...");

    setInterval(() => {
      const jobs = productQueue.getAll();

      if (jobs.length === 0) return;

      const job = jobs.shift();

      if (!job) return;

      console.log("[WORKER] Processing job:", job);

      // TODO: replace with real pipeline logic
    }, 2000);
  }
}
