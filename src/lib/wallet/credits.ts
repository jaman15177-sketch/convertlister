// 🧠 SIMPLE WALLET / CREDITS ENGINE (MVP)
// Production upgrade: DB + Stripe + ledger system

type Wallet = {
  userId: string;
  balance: number;
};

const wallets: Map<string, Wallet> = new Map();

/**
 * Initialize wallet if not exists
 */
function getWallet(userId: string): Wallet {
  if (!wallets.has(userId)) {
    wallets.set(userId, { userId, balance: 100 }); // default credits
  }
  return wallets.get(userId)!;
}

/**
 * Spend credits safely
 */
export async function spendWallet(userId: string, amount: number) {
  const wallet = getWallet(userId);

  if (wallet.balance < amount) {
    return {
      success: false,
      error: "INSUFFICIENT_CREDITS",
    };
  }

  wallet.balance -= amount;

  return {
    success: true,
    remaining: wallet.balance,
  };
}

/**
 * Get balance
 */
export function getBalance(userId: string) {
  return getWallet(userId).balance;
}
