import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();
    const { user } = body;

    // =========================
    // MOCK USER VALIDATION (TEMP SAFE MODE)
    // Replace later with real auth
    // =========================
    if (!user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // =========================
    // PRODUCT CREATION LOGIC (SAFE STUB)
    // =========================
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        user_id: user.id,
        name: body.name || "Untitled Product",
        price: body.price || 0,
        status: "active",
      })
      .select()
      .single();

    if (error || !product) {
      return Response.json(
        {
          error: error?.message || "Product creation failed",
        },
        { status: 500 }
      );
    }

    // =========================
    // ZERO-CREDIT MODEL (NO WALLET SYSTEM)
    // =========================
    const creditResult = {
      success: true,
      mode: "zero-credit",
    };

    // =========================
    // RESPONSE
    // =========================
    return Response.json({
      success: true,
      product,
      billing: creditResult,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error?.message || "Unexpected error",
      },
      { status: 500 }
    );
  }
}
