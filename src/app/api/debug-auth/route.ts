import { supabase } from "@/core/ssot/db/supabase.client";

export async function GET() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "fake@test.com",
      password: "12345678",
    });

    return Response.json({
      success: true,
      data,
      error,
    });
  } catch (err: any) {
    return Response.json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
}

