import { spendWallet } from "./wallet/credits";

/**
 * Simple wrapper around wallet system
 * - alias-free (server-safe)
 * - no type coupling issues
 * - future-proof for ledger upgrade
 */
export async function spendCredits(userId: string, amount: number) {
  const result = await spendWallet(userId, amount);

  return result;
}
