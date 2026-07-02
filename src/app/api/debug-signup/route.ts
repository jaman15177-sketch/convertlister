import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const result = await supabase.auth.signUp({
      email: `debug${Date.now()}@gmail.com`,
      password: "Test123456",
    });

    return Response.json(result);
  } catch (err: any) {
    return Response.json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
}
