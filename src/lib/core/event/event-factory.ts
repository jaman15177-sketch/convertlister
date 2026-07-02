import { v4 as uuid } from "uuid";

export interface EventContext {
  event_id: string;
  trace_id: string;
}

export function createEvent(input: Partial<EventContext>): EventContext {
  const trace_id = input.trace_id || uuid();

  return {
    event_id: uuid(),
    trace_id,
  };
}
