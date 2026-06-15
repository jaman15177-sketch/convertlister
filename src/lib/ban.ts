import { supabase } from "./supabase";

/**
 * ADD FRAUD STRIKE
 */
export async function addFraudStrike(
  userId: string
) {
  // get current
  const { data } = await supabase
    .from("user_security")
    .select("*")
    .eq("user_id", userId)
    .single();

  // first time
  if (!data) {
    await supabase.from("user_security").insert({
      user_id: userId,
      fraud_strikes: 1,
    });

    return;
  }

  const strikes = data.fraud_strikes + 1;

  // =========================
  // AUTO BAN LOGIC
  // =========================

  let is_banned = false;
  let banned_until = null;

  // TEMP BAN
  if (strikes >= 3) {
    is_banned = true;

    banned_until = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();
  }

  // PERMANENT BAN
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

  // AUDIT LOG
  await supabase.from("audit_logs").insert({
    user_id: userId,
    action: "FRAUD_STRIKE",
    meta: {
      strikes,
      is_banned,
    },
  });
}

/**
 * CHECK IF USER IS BANNED
 */
export async function isUserBanned(
  userId: string
) {
  const { data } = await supabase
    .from("user_security")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) return false;

  // permanent ban
  if (
    data.is_banned &&
    !data.banned_until
  ) {
    return true;
  }

  // temporary ban
  if (
    data.banned_until &&
    new Date(data.banned_until) > new Date()
  ) {
    return true;
  }

  return false;
}
