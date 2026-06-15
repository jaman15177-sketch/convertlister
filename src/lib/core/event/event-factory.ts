import { v4 as uuid } from "uuid";
import { EventContext } from "./event-context";

export function createEvent(input: Partial<EventContext>): EventContext {
  const trace_id = input.trace_id || uuid();

  return {
    event_id: uuid(),
    trace_id,
    correlation_id: input.correlation_id || trace_id,

    user_id: input.user_id,
    org_id: input.org_id,

    job_id: input.job_id || "unknown",
    event_type: input.event_type || "log.created",
    level: input.level || "info",

    message: input.message || "",

    timestamp: new Date().toISOString(),

    metadata: input.metadata || {},
  };
}
