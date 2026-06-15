"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spendCredits = spendCredits;
const credits_1 = require("./wallet/credits");
/**
 * Simple wrapper around wallet system
 * - alias-free (server-safe)
 * - no type coupling issues
 * - future-proof for ledger upgrade
 */
async function spendCredits(userId, amount) {
    const result = await (0, credits_1.spendWallet)(userId, amount);
    return result;
}
