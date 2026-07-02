import { deductCredit } from "./deduct-credit";

export async function spendCredits(
  userId?: string,
  amount?: number
) {
  if (!userId || !amount) {
    throw new Error("Missing userId or amount");
  }

  return deductCredit(userId, amount);
}
