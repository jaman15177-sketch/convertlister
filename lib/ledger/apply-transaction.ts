import { createClient } from "@/lib/supabase/server";

/**
 * UNIVERSAL LEDGER ENGINE (PRODUCTION CORE)
 * - Stripe / bKash compatible
 * - Idempotent
 * - Audit-safe
 */

export async function applyLedgerTransaction(input: {
  userId: string;
  provider: string;
  providerEventId: string;
  amount: number;
  credits: number;
  type: string;
  raw: any;
}) {
  const supabase = await createClient();

  // =========================
  // 1. IDEMPOTENCY CHECK
  // =========================
  const { data: exists } = await supabase
    .from("payment_ledger")
    .select("id")
    .eq("provider_event_id", input.providerEventId)
    .maybeSingle();

  if (exists) {
    return {
      ok: true,
      duplicated: true,
    };
  }

  // =========================
  // 2. INSERT LEDGER ENTRY
  // =========================
  const { error: ledgerError } = await supabase
    .from("payment_ledger")
    .insert({
      user_id: input.userId,
      provider: input.provider,
      provider_event_id: input.providerEventId,
      type: input.type,
      amount: input.amount,
      credits: input.credits,
      status: "success",
      raw_payload: input.raw,
    });

  if (ledgerError) {
    throw new Error(ledgerError.message);
  }

  // =========================
  // 3. UPDATE WALLET BALANCE
  // =========================
  const { data: wallet } = await supabase
    .from("user_wallets")
    .select("balance")
    .eq("user_id", input.userId)
    .maybeSingle();

  const newBalance = (wallet?.balance || 0) + input.credits;

  await supabase.from("user_wallets").upsert({
    user_id: input.userId,
    balance: newBalance,
    updated_at: new Date().toISOString(),
  });

  // =========================
  // 4. RETURN RESULT
  // =========================
  return {
    ok: true,
    balance: newBalance,
  };
}
