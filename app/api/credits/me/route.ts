import { createClient } from "@/lib/supabase/server";

/**
 * CREDIT STATUS API
 * Returns user balance + daily usage
 */

export async function GET(req: Request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // =========================
    // GET WALLET BALANCE
    // =========================
    const { data: wallet } = await supabase
      .from("user_credits")
      .select("balance")
      .eq("user_id", userId)
      .maybeSingle();

    // =========================
    // GET TODAY SPEND
    // =========================
    const today = new Date().toISOString().slice(0, 10);

    const { data: spendLogs } = await supabase
      .from("credit_transactions")
      .select("amount, created_at")
      .eq("user_id", userId)
      .eq("type", "SPEND")
      .gte("created_at", today);

    const spentToday =
      spendLogs?.reduce((sum, t) => sum + t.amount, 0) || 0;

    return Response.json({
      success: true,
      balance: wallet?.balance || 0,
      spent_today: spentToday,
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
