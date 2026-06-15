import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/audit/logAudit";

export async function POST(req: Request) {
  try {
    // =========================
    // 1. INIT SUPABASE CLIENT
    // =========================
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // =========================
    // 2. PARSE REQUEST BODY
    // =========================
    const body = await req.json();

    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing prompt",
        },
        { status: 400 }
      );
    }

    // =========================
    // 3. CORE BUSINESS LOGIC
    // (placeholder generator)
    // =========================
    const product = {
      id: crypto.randomUUID(),
      userId: user.id,
      prompt,
      status: "GENERATED",
      createdAt: new Date().toISOString(),
    };

    // =========================
    // 4. AUDIT LOG (REVENUE TRACKING)
    // =========================
    await logAudit(user.id, "PRODUCT_GENERATED", {
      cost: 10,
      productId: product.id,
    });

    // =========================
    // 5. RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error("generate-product error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
