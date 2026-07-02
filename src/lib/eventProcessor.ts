import { createClient } from "./supabase/server";

/**
 * Webhook Event Processor
 * - dedup webhook events
 * - stores event log
 * - safe supabase usage
 */

export async function processEvent(eventId: string, payload: any) {
  const supabase = await createClient();

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
