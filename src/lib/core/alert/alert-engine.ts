import { supabaseAdmin } from "../../server/supabase-admin";

export interface AlertEvent {
  type: string;
  payload?: Record<string, unknown>;
}

export async function processAlert(event: AlertEvent) {
  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("alerts")
      .select("*")
      .eq("event_type", event.type)
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    // Update existing alert
    if (existing) {
      const { data, error } = await supabaseAdmin
        .from("alerts")
        .update({
          payload: event.payload ?? {},
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        status: "UPDATED",
        alert: data,
      };
    }

    // Create new alert
    const { data, error } = await supabaseAdmin
      .from("alerts")
      .insert({
        event_type: event.type,
        payload: event.payload ?? {},
        status: "ACTIVE",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      status: "CREATED",
      alert: data,
    };
  } catch (err: unknown) {
    console.error("ALERT_ENGINE_ERROR:", err);

    return {
      status: "ERROR",
      message:
        err instanceof Error
          ? err.message
          : "Unknown alert engine error",
    };
  }
}
