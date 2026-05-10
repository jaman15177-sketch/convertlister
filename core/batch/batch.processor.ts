import { BatchQueue } from "./batch.queue";
import { BatchItem, BatchResult } from "./batch.types";

export class BatchProcessor {

  constructor(private queue: BatchQueue) {}

  async processAll(
    handler: (item: BatchItem) => Promise<string>
  ): Promise<BatchResult[]> {

    const results: BatchResult[] = [];

    while (this.queue.size() > 0) {

      const item = this.queue.next();
      if (!item) break;

      try {
        const output = await handler(item);

        results.push({
          id: item.id,
          success: true,
          output
        });

      } catch (error: any) {

        results.push({
          id: item.id,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }
}
