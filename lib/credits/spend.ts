import { createClient } from "@/lib/supabase/server";

export async function spendCredits(
  userId: string,
  amount: number,
  reason: string
) {
  const supabase = await createClient();

  const { data: wallet } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (!wallet || wallet.balance < amount) {
    throw new Error("Insufficient credits");
  }

  // deduct
  await supabase
    .from("user_credits")
    .update({
      balance: wallet.balance - amount,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  // log transaction
  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "SPEND",
    amount,
    reason,
  });
}
