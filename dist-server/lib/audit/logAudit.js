"use strict";
// 🧠 MVP AUDIT LAYER (SaaS-ready stub)
// Later upgrade → Supabase / DB / Kafka
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAudit = logAudit;
exports.getAuditLogs = getAuditLogs;
const memoryLog = [];
async function logAudit(userId, action, metadata) {
    const event = {
        userId,
        action,
        metadata,
        timestamp: new Date().toISOString(),
    };
    memoryLog.push(event);
    // dev visibility
    console.log("AUDIT_EVENT:", event);
    return { success: true };
}
function getAuditLogs() {
    return memoryLog;
}
