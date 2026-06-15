"use strict";
// 🧠 FRAUD DETECTION ENGINE (MVP SAAS CORE)
// Clean, extensible, production-safe baseline
Object.defineProperty(exports, "__esModule", { value: true });
exports.logFraud = logFraud;
exports.detectDuplicateTransaction = detectDuplicateTransaction;
exports.detectFraud = detectFraud;
exports.getFraudLogs = getFraudLogs;
exports.clearFraudLogs = clearFraudLogs;
// =========================
// IN-MEMORY STORAGE (MVP)
// =========================
const fraudLog = [];
// =========================
// CORE FRAUD LOGGER
// =========================
async function logFraud(userId, type, level, metadata) {
    const event = {
        userId,
        type,
        level,
        metadata,
        timestamp: new Date().toISOString(),
    };
    fraudLog.push(event);
    console.log("🚨 FRAUD EVENT:", event);
    return { success: true };
}
// =========================
// DUPLICATE TRANSACTION CHECK
// =========================
async function detectDuplicateTransaction(userId, trx_id) {
    const exists = fraudLog.find((f) => f.userId === userId &&
        f.type === "DUPLICATE_TRX" &&
        f.metadata?.trx_id === trx_id);
    if (exists) {
        await logFraud(userId, "DUPLICATE_TRX", "high", {
            trx_id,
        });
        return {
            flagged: true,
            reason: "DUPLICATE_TRANSACTION",
        };
    }
    return {
        flagged: false,
    };
}
// =========================
// MAIN FRAUD ENGINE
// =========================
async function detectFraud(input) {
    const { userId, trx_id, amount, sender_number } = input;
    // Step 1: duplicate check
    const duplicate = await detectDuplicateTransaction(userId, trx_id);
    if (duplicate.flagged) {
        await logFraud(userId, "DUPLICATE_TRX", "high", {
            trx_id,
            amount,
            sender_number,
        });
        return {
            flagged: true,
            blocked: true,
            reason: duplicate.reason,
        };
    }
    // Step 2: simple risk heuristics (MVP rules)
    if (amount && amount > 10000) {
        await logFraud(userId, "HIGH_VALUE_TX", "medium", {
            trx_id,
            amount,
            sender_number,
        });
        return {
            flagged: true,
            blocked: false,
            reason: "HIGH_VALUE_TRANSACTION",
        };
    }
    return {
        flagged: false,
        blocked: false,
    };
}
// =========================
// DEBUG HELPERS
// =========================
function getFraudLogs() {
    return fraudLog;
}
function clearFraudLogs() {
    fraudLog.length = 0;
}
