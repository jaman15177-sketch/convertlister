import { createClient } from "@/lib/supabase/server";

/**
 * DAILY FREE CREDIT SYSTEM
 * Grants 30 credits once per day per user
 */
export async function grantDailyCredits(userId: string) {
  const supabase = await createClient();

  const today = new Date().toISOString().slice(0, 10);

  // =========================
  // CHECK ALREADY GRANTED TODAY
  // =========================
  const { data: existing } = await supabase
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("type", "DAILY_GRANT")
    .gte("created_at", today)
    .maybeSingle();

  if (existing) {
    return { granted: false, message: "Already granted today" };
  }

  // =========================
  // UPSERT WALLET
  // =========================
  const { data: wallet } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .maybeSingle();

  const currentBalance = wallet?.balance || 0;

  const newBalance = currentBalance + 30;

  await supabase.from("user_credits").upsert({
    user_id: userId,
    balance: newBalance,
    updated_at: new Date().toISOString(),
  });

  // =========================
  // LOG TRANSACTION
  // =========================
  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "DAILY_GRANT",
    amount: 30,
    reason: "Daily free credits",
  });

  return {
    granted: true,
    credits: 30,
    balance: newBalance,
  };
}
