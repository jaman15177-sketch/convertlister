import { createClient } from "@/lib/supabase/server";
import { apiGuard } from "@/lib/security/guard";

export async function POST(req: Request) {
  try {
    // =========================
    // GUARD (NEW CONTRACT: NO ARGS)
    // =========================
    await apiGuard();

    const supabase = await createClient();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    // =========================
    // AUTH SIGNUP
    // =========================
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      user: data.user,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message || "Signup failed",
      },
      { status: 500 }
    );
  }
}
