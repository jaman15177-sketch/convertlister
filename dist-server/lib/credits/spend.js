"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spendCredits = spendCredits;
async function spendCredits(userId, amount) {
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
