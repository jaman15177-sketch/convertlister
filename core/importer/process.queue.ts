import { processProduct } from "../pipeline/winner.pipeline";

interface QueueItem {
  id?: string;
  type?: string;
  payload: {
    title?: string;
    url?: string;
    score?: number;
    [key: string]: any;
  };
}

export async function processQueue(items: QueueItem[] = []) {
  console.log("🚀 PROCESS QUEUE STARTED");

  const results: any[] = [];

  for (const item of items) {
    try {
      const product = item.payload;

      if (!product) continue;

      const result = await processProduct(product);

      const status = result?.success ? "success" : "failed";

      console.log("📊 RESULT:", {
        status,
        success: result?.success,
        processed: (result as any)?.processed ?? 0,
        inserted: (result as any)?.inserted ?? 0,
      });

      results.push(result);
    } catch (err) {
      console.error("❌ Queue Error:", err);

      results.push({
        success: false,
        error: err,
      });
    }
  }

  return {
    success: true,
    total: items.length,
    results,
  };
}
