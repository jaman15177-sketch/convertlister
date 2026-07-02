import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/core/ssot/db/supabase.admin";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing userId or email",
        },
        { status: 400 }
      );
    }

    // Create / Update profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        user_id: userId,
        email,
      });

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          error: profileError.message,
        },
        { status: 500 }
      );
    }

    // Create organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from("organizations")
      .insert({
        name: "My Organization",
        owner_id: userId,
      })
      .select()
      .single();

    if (orgError || !org) {
      return NextResponse.json(
        {
          success: false,
          error: orgError?.message ?? "Organization creation failed",
        },
        { status: 500 }
      );
    }

    // Create organization member
    const { error: memberError } = await supabaseAdmin
      .from("organization_members")
      .insert({
        organization_id: org.id,
        user_id: userId,
        role: "owner",
      });

    if (memberError) {
      return NextResponse.json(
        {
          success: false,
          error: memberError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        organization: org,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Onboarding error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
