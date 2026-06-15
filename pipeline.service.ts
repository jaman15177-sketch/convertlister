import { eventBus } from "@/core/event/event-bus";
import { ObservabilityEvent } from "./types";
import { processDecision } from "./autonomous-decision.engine";

export function handleEvent(event: ObservabilityEvent) {
  // 1. minimal normalization
  const normalized = {
    ...event,
    timestamp: event.timestamp || Date.now(),
  };

  // 2. send to decision engine
  const decision = processDecision(normalized);

  // 3. route result
  if (decision.shouldAlert) {
    eventBus.emit("alert.created", {
      event: normalized,
      severity: decision.severity,
      reason: decision.reason,
    });
  }

  // 4. always emit log stream
  eventBus.emit("log.ingested", normalized);

  return { ok: true };
}
