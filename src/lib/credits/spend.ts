export async function spendCredits(
  userId?: string,
  amount?: number
) {
  if (!userId || !amount) {
    throw new Error("Missing userId or amount");
  }

  // MOCK SAFE IMPLEMENTATION (replace with DB later)
  return {
    success: true,
    userId,
    spent: amount,
    remaining: 100 - amount,
  };
}
