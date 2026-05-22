import { metrics } from "./metrics";

export function exportMetrics() {
  return Object.entries(metrics.all())
    .map(([k, v]) => `${k} ${v.value}`)
    .join("\n");
}
