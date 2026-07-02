type Wallet = {
id: string;
user_id: string;
credits: number;
balance?: number;
};

import { supabase } from "@/core/ssot/db/supabase.client";

/**

* 🔥 ADMIN CREDIT ADD SYSTEM
* Build-safe version for untyped Supabase client
  */
  export async function addCredits(
  userId: string,
  amount: number
  ) {
  try {
  const { data: walletRow } = await (supabase as any)
  .from("wallets")
  .select("*")
  .eq("user_id", userId)
  .single();

  const wallet = walletRow as Wallet | null;

  const newCredits =
  (wallet?.credits ?? 0) + amount;

  const { error } = await (supabase as any)
  .from("wallets")
  .update({
  credits: newCredits,
  updated_at: new Date().toISOString(),
  })
  .eq("user_id", userId);

  if (error) {
  throw error;
  }

  await (supabase as any)
  .from("transactions")
  .insert({
  user_id: userId,
  type: "credit_add",
  amount,
  meta: {
  source: "admin_override",
  },
  });

  return {
  success: true,
  newCredits,
  };
  } catch (err: any) {
  return {
  success: false,
  error:
  err?.message ??
  "Failed to add credits",
  };
  }
  }

/**

* 🔥 ADMIN CREDIT REMOVE SYSTEM
  */
  export async function removeCredits(
  userId: string,
  amount: number
  ) {
  try {
  const { data: walletRow } = await (supabase as any)
  .from("wallets")
  .select("*")
  .eq("user_id", userId)
  .single();

  const wallet = walletRow as Wallet | null;

  const newCredits = Math.max(
  0,
  (wallet?.credits ?? 0) - amount
  );

  const { error } = await (supabase as any)
  .from("wallets")
  .update({
  credits: newCredits,
  updated_at: new Date().toISOString(),
  })
  .eq("user_id", userId);

  if (error) {
  throw error;
  }

  await (supabase as any)
  .from("transactions")
  .insert({
  user_id: userId,
  type: "credit_remove",
  amount,
  meta: {
  source: "admin_override",
  },
  });

  return {
  success: true,
  newCredits,
  };
  } catch (err: any) {
  return {
  success: false,
  error:
  err?.message ??
  "Failed to remove credits",
  };
  }
  }

