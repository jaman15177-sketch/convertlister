import { ObservabilityEvent, DecisionResult } from "./types";

export function processDecision(
  event: ObservabilityEvent
): DecisionResult {
  let severity = 0;

  // scoring logic
  if (event.level === "error") severity += 10;
  if (event.message.includes("db")) severity += 5;
  if (event.message.includes("timeout")) severity += 3;

  const shouldAlert = severity >= 10;

  return {
    shouldAlert,
    severity,
    reason: shouldAlert ? "threshold exceeded" : "normal flow",
  };
}
