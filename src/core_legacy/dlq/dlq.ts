// 🧠 DEAD LETTER QUEUE (DLQ)
// MVP production-safe in-memory implementation
// Upgrade path: Redis / BullMQ / database persistence

type DLQItem = {
  id: string;
  payload: any;
  error: string;
  timestamp: string;
};

const dlqStore: DLQItem[] = [];

/**
 * Move failed job into Dead Letter Queue
 */
export async function moveToDLQ(job: any, error?: any) {
  const item: DLQItem = {
    id: job?.id || `dlq-${Date.now()}`,
    payload: job,
    error: error?.message || String(error),
    timestamp: new Date().toISOString(),
  };

  dlqStore.push(item);

  console.log("📦 DLQ captured:", item);

  return {
    success: true,
    moved: true,
    id: item.id,
  };
}

/**
 * Read all DLQ items (debug/admin)
 */
export function getDLQItems() {
  return dlqStore;
}

/**
 * Clear DLQ (use carefully)
 */
export function clearDLQ() {
  dlqStore.length = 0;
  return { success: true };
}
