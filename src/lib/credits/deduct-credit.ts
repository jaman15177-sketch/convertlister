import { supabase } from "@/core/ssot/db/supabase.client";
import { acquireLock, releaseLock } from "./redis-lock";

type Wallet = {
  id: string;
  user_id: string;
  credits: number;
  balance?: number;
};

export type DeductCreditResult = {
  success: boolean;
  remaining: number;
};

export async function deductCredit(
  userId: string,
  amount = 1
): Promise<DeductCreditResult> {
  const lockKey = `credit:${userId}`;

  const locked = await acquireLock(lockKey);

  if (!locked) {
    return { success: false, remaining: 0 };
  }

  let result: DeductCreditResult = {
    success: false,
    remaining: 0,
  };

  try {
    const { data, error } = await (supabase as any)
      .from("wallets")
      .select("*")
      .eq("user_id", userId)
      .single();

    const wallet = data as Wallet | null;

    if (error || !wallet) {
      result = { success: false, remaining: 0 };
    } else {
      const current = wallet.credits ?? 0;

      if (current < amount) {
        result = { success: false, remaining: current };
      } else {
        const remaining = current - amount;

        const { error: updateError } = await (supabase as any)
          .from("wallets")
          .update({
            credits: remaining,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (updateError) {
          result = { success: false, remaining: current };
        } else {
          await (supabase as any)
            .from("transactions")
            .insert({
              user_id: userId,
              type: "debit",
              amount,
              meta: {
                action: "product_listing",
              },
            });

          result = { success: true, remaining };
        }
      }
    }
  } finally {
    await releaseLock(lockKey);
  }

  return result;
}
