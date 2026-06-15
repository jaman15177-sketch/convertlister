"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEvent = processEvent;
const server_1 = require("./supabase/server");
/**
 * Webhook Event Processor
 * - dedup webhook events
 * - stores event log
 * - safe supabase usage
 */
async function processEvent(eventId, payload) {
    const supabase = await (0, server_1.createClient)();
    // Check duplicate event
    const { data: existingEvent, error: fetchError } = await supabase
        .from("webhook_events")
        .select("id")
        .eq("event_id", eventId)
        .maybeSingle();
    if (fetchError) {
        console.error("Event fetch error:", fetchError);
        throw new Error("Failed to check event");
    }
    if (existingEvent) {
        return {
            success: true,
            status: "duplicate_ignored",
            eventId,
        };
    }
    // Store event
    const { error: insertError } = await supabase
        .from("webhook_events")
        .insert({
        event_id: eventId,
        payload,
        status: "processed",
        created_at: new Date().toISOString(),
    });
    if (insertError) {
        console.error("Event insert error:", insertError);
        throw new Error("Failed to store event");
    }
    return {
        success: true,
        status: "processed",
        eventId,
    };
}
