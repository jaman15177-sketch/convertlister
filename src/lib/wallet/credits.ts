import { supabase } from "@/core/ssot/db/supabase.client";
import { deductCredit } from "@/lib/credits/deduct-credit";

/**
 * SINGLE SOURCE OF TRUTH
 * Supabase wallets table
 */

export async function spendWallet(
  userId: string,
  amount: number
) {
  return deductCredit(userId, amount);
}

export async function getBalance(
  userId: string
): Promise<number> {
  const { data, error } = await supabase
    .from("wallets")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return 0;
  }

  return Number(data.balance ?? 0);
}
