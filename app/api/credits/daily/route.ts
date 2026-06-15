import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";

export async function POST(req: Request) {
  // =========================
  // AUTH CHECK
  // =========================
  const user = await getUser(req);

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const supabase = await createClient();

  // =========================
  // TODAY CHECK
  // =========================
  const today = new Date().toISOString().slice(0, 10);

  const { data: exists } = await supabase
    .from("credit_transactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("type", "DAILY_GRANT")
    .gte("created_at", today)
    .maybeSingle();

  if (exists) {
    return Response.json({
      granted: false,
      message: "Already claimed today",
    });
  }

  // =========================
  // GET WALLET
  // =========================
  const { data: wallet } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", user.id)
    .maybeSingle();

  const currentBalance = wallet?.balance || 0;
  const newBalance = currentBalance + 30;

  // =========================
  // UPDATE WALLET
  // =========================
  await supabase.from("user_credits").upsert({
    user_id: user.id,
    balance: newBalance,
  });

  // =========================
  // LOG TRANSACTION
  // =========================
  await supabase.from("credit_transactions").insert({
    user_id: user.id,
    type: "DAILY_GRANT",
    amount: 30,
  });

  // =========================
  // RESPONSE
  // =========================
  return Response.json({
    success: true,
    granted: true,
    balance: newBalance,
  });
}
