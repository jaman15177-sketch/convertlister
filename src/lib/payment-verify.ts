import { supabase } from "./supabase";
/**
 * VERIFY PAYMENT SAFETY CHECKS
 */
export async function verifyPayment({
  trx_id,
  amount,
}: {
  trx_id: string;
  amount: number;
}) {
  // 1. duplicate trx check
  const { data: existing } = await supabase
    .from("payment_requests")
    .select("*")
    .eq("trx_id", trx_id)
    .maybeSingle();

  if (existing) {
    return {
      ok: false,
      reason: "Duplicate transaction ID",
    };
  }

  // 2. basic amount validation
  if (amount <= 0 || amount > 50000) {
    return {
      ok: false,
      reason: "Invalid amount range",
    };
  }

  return { ok: true };
}
