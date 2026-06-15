import { eventBus } from "../bus/event-bus";
import { processAlert } from "../alert/alert-engine";

export async function processEvent(input: any) {
  const event = {
    id: crypto.randomUUID(),
    type: "log.created",
    job_id: input.job_id,
    level: input.level,
    message: input.message,
    timestamp: new Date().toISOString(),
  };

  // 1. EMIT LOG EVENT
  eventBus.emitEvent("log.created", event);

  // 2. ALERT ENGINE (ONLY PLACE IT EXISTS)
  const alert = await processAlert(event);

  // 3. EMIT ALERT EVENTS
  if (alert?.created) {
    eventBus.emitEvent("alert.created", alert.data);
  }

  if (alert?.updated) {
    eventBus.emitEvent("alert.updated", alert.data);
  }

  return { event, alert };
}
