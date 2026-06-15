import { productQueue } from "@/core/queue/queue.client";

export async function addToQueue(type: string, payload: any) {
  return productQueue.add(type, payload);
}
