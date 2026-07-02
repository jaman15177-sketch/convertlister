import { supabase } from "./supabase";

/**
 * ADD FRAUD STRIKE
 */
export async function addFraudStrike(userId: string): Promise<void> {
  const { data } = await supabase
    .from("user_security")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) {
    await supabase.from("user_security").insert({
      user_id: userId,
      fraud_strikes: 1,
    });

    return;
  }

  const strikes = Number(data.fraud_strikes ?? 0) + 1;

  let is_banned = false;
  let banned_until: string | null = null;

  if (strikes >= 3) {
    is_banned = true;

    banned_until = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();
  }

  if (strikes >= 5) {
    is_banned = true;
    banned_until = null;
  }

  await supabase
    .from("user_security")
    .update({
      fraud_strikes: strikes,
      is_banned,
      banned_until,
    })
    .eq("user_id", userId);

    await supabase.from("audit_logs").insert({
    actor_id: userId,
    action: "FRAUD_STRIKE",
    entity_type: "user_security",
    entity_id: userId,
    metadata: {
      strikes,
      is_banned,
    },
    created_at: new Date().toISOString(),
  });
}/**
 * CHECK IF USER IS BANNED
 */
export async function isUserBanned(
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("user_security")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) {
    return false;
  }

  if (data.is_banned && !data.banned_until) {
    return true;
  }

  if (
    data.banned_until &&
    new Date(data.banned_until) > new Date()
  ) {
    return true;
  }

  return false;
}
