"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const uuid_1 = require("uuid");
function createEvent(input) {
    const trace_id = input.trace_id || (0, uuid_1.v4)();
    return {
        event_id: (0, uuid_1.v4)(),
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
