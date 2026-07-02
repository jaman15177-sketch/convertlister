import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    console.log("ENV CHECK", {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  anonLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message:
        "Signup successful. Onboarding will be completed automatically.",
    });
  } catch (error) {
    console.error("SIGNUP EXCEPTION:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
