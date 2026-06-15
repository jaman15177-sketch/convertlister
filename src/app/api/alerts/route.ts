import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { processAlert } from "@/lib/core/alert/alert-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.type) {
      return NextResponse.json(
        { error: "Missing event type" },
        { status: 400 }
      );
    }

    // 1. Save raw event to database (audit trail)
    const { data: eventLog, error: logError } = await supabaseAdmin
      .from("event_bus")
      .insert({
        topic: body.type,
        payload: body,
        processed: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (logError) throw logError;

    // 2. Process alert through engine
    const result = await processAlert(body);

    // 3. Mark event as processed
    const { error: updateError } = await supabaseAdmin
      .from("event_bus")
      .update({ processed: true })
      .eq("id", eventLog.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      eventId: eventLog.id,
      result,
    });
  } catch (err: any) {
    console.error("ALERT_ROUTE_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
