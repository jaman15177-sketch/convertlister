import { BatchItem } from "./batch.types";

export class BatchQueue {
  private queue: BatchItem[] = [];

  add(item: BatchItem) {
    this.queue.push(item);
  }

  next(): BatchItem | undefined {
    return this.queue.shift();
  }

  size(): number {
    return this.queue.length;
  }

  getAll(): BatchItem[] {
    return this.queue;
  }
}
