import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

export const productWorker = new Worker(
  "product-queue",
  async (job) => {
    try {
      console.log("Processing product:", job.data);

      const { PipelineService } = await import("../engine/pipeline.service");

      const pipeline = new PipelineService();

      const result = await pipeline.run(job.data.product);

      console.log("Pipeline result:", result);

      return result;
    } catch (error) {
      console.error("Worker error:", error);
      throw error;
    }
  },
  { connection }
);

console.log("Worker started...");
