/**
 * ==========================================================
 * BACKGROUND WORKER SYSTEM (SaaS CORE)
 * ==========================================================
 * - Async job processing
 * - Retry safe execution
 * - Prevent concurrent overlap
 * - Ready for Redis upgrade later
 * ==========================================================
 */

export type WorkerJob<T = any> = {
  id: string;
  type: string;
  payload: T;
  retries?: number;
};

type WorkerHandler<T = any> = (
  job: WorkerJob<T>
) => Promise<void>;

class BackgroundWorker {
  private queue: WorkerJob[] = [];
  private handlers: Map<string, WorkerHandler> =
    new Map();

  private running = false;
  private processing = false;

  /**
   * Register handler
   */
  register<T>(
    type: string,
    handler: WorkerHandler<T>
  ) {
    this.handlers.set(type, handler);
  }

  /**
   * Add job to queue
   */
  addJob<T>(job: WorkerJob<T>) {
    this.queue.push(job);
  }

  /**
   * Start worker loop
   */
  start(intervalMs: number = 2000) {
    if (this.running) return;

    this.running = true;

    console.log("⚙️ Background Worker started");

    setInterval(async () => {
      await this.processQueue();
    }, intervalMs);
  }

  /**
   * Stop worker
   */
  stop() {
    this.running = false;
    console.log("⛔ Background Worker stopped");
  }

  /**
   * Core processing loop
   */
  private async processQueue() {
    if (this.processing) return;
    if (this.queue.length === 0) return;

    this.processing = true;

    const job = this.queue.shift();

    if (!job) {
      this.processing = false;
      return;
    }

    const handler = this.handlers.get(job.type);

    if (!handler) {
      console.error(
        `❌ No handler for job type: ${job.type}`
      );
      this.processing = false;
      return;
    }

    try {
      await handler(job);
      console.log(
        `✅ Job completed: ${job.id}`
      );
    } catch (err) {
      console.error(
        `❌ Job failed: ${job.id}`,
        err
      );

      // -----------------------------
      // RETRY LOGIC
      // -----------------------------
      job.retries = (job.retries || 0) + 1;

      if (job.retries <= 3) {
        console.log(
          `🔁 Retrying job: ${job.id} (${job.retries})`
        );
        this.queue.push(job);
      } else {
        console.error(
          `💀 Job dropped after retries: ${job.id}`
        );
      }
    }

    this.processing = false;
  }

  /**
   * Queue status
   */
  size() {
    return this.queue.length;
  }
}

/**
 * Singleton worker instance
 */
export const backgroundWorker =
  new BackgroundWorker();
