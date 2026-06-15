"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = verifyPayment;
const supabase_1 = require("./supabase");
/**
 * VERIFY PAYMENT SAFETY CHECKS
 */
async function verifyPayment({ trx_id, amount, }) {
    // 1. duplicate trx check
    const { data: existing } = await supabase_1.supabase
        .from("payment_requests")
        .select("*")
        .eq("trx_id", trx_id)
        .maybeSingle();
    if (existing) {
        return {
            ok: false,
            reason: "Duplicate transaction ID",
        };
    }
    // 2. basic amount validation
    if (amount <= 0 || amount > 50000) {
        return {
            ok: false,
            reason: "Invalid amount range",
        };
    }
    return { ok: true };
}
