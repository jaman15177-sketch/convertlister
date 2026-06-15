"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEvent = processEvent;
const event_bus_1 = require("../bus/event-bus");
const alert_engine_1 = require("../alert/alert-engine");
async function processEvent(input) {
    const event = {
        id: crypto.randomUUID(),
        type: "log.created",
        job_id: input.job_id,
        level: input.level,
        message: input.message,
        timestamp: new Date().toISOString(),
    };
    // 1. EMIT LOG EVENT
    event_bus_1.eventBus.emitEvent("log.created", event);
    // 2. ALERT ENGINE (ONLY PLACE IT EXISTS)
    const alert = await (0, alert_engine_1.processAlert)(event);
    // 3. EMIT ALERT EVENTS
    if (alert?.created) {
        event_bus_1.eventBus.emitEvent("alert.created", alert.data);
    }
    if (alert?.updated) {
        event_bus_1.eventBus.emitEvent("alert.updated", alert.data);
    }
    return { event, alert };
}
