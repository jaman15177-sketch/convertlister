import { getMetrics } from "./metrics";

/**
 * ==========================================================
 * METRICS EXPORTER
 * ==========================================================
 */

export async function exportMetrics(): Promise<string> {
  return await getMetrics();
}
