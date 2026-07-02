import { eventBus } from "../ws/ws-bus";
import { processAlert } from "../alert/alert-engine";

export interface EventInput {
  type: string;
  payload?: Record<string, unknown>;
  trace_id?: string;
}

export async function processEvent(input: EventInput) {
  try {
    eventBus.emit("event", input);

    const alertResult = await processAlert({
      type: input.type,
      payload: input.payload,
    });

    return {
      success: true,
      alert: alertResult,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
