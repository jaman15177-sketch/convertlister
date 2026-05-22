import { health } from "./health";
import { exportMetrics } from "./exporter";

export function snapshot() {
  return {
    health: health(),
    metrics: exportMetrics(),
  };
}
