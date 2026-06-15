"use strict";
// 🧠 SIMPLE WALLET / CREDITS ENGINE (MVP)
// Production upgrade: DB + Stripe + ledger system
Object.defineProperty(exports, "__esModule", { value: true });
exports.spendWallet = spendWallet;
exports.getBalance = getBalance;
const wallets = new Map();
/**
 * Initialize wallet if not exists
 */
function getWallet(userId) {
    if (!wallets.has(userId)) {
        wallets.set(userId, { userId, balance: 100 }); // default credits
    }
    return wallets.get(userId);
}
/**
 * Spend credits safely
 */
async function spendWallet(userId, amount) {
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
function getBalance(userId) {
    return getWallet(userId).balance;
}
