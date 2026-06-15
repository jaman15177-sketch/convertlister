type QueueJob = {
  type: string;
  payload: any;
  createdAt: number;
};

class ProductQueue {
  private queue: QueueJob[] = [];

  async add(type: string, payload: any) {
    const job: QueueJob = {
      type,
      payload,
      createdAt: Date.now(),
    };

    // In production: replace with BullMQ later
    this.queue.push(job);

    console.log("[QUEUE] Job added:", job);

    return {
      success: true,
      jobId: job.createdAt,
      job,
    };
  }

  getAll() {
    return this.queue;
  }
}

export const productQueue = new ProductQueue();
