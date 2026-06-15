"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
const supabase_1 = require("./supabase");
async function logAudit(userId, action, meta = {}) {
    await supabase_1.supabase.from("audit_logs").insert({
        user_id: userId,
        action,
        meta,
    });
}
