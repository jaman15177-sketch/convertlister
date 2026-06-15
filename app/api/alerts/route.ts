import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("alerts")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    count: data.length,
    alerts: data,
    engine: "alert-system-v3",
  });
}
