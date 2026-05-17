"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFailure = handleFailure;
const redis_queue_1 = require("../queue/redis.queue");
const dlq_1 = require("../dlq/dlq");
// ==========================
// EXPONENTIAL BACKOFF
// ==========================
const RETRY_DELAYS = [
    1000, // 1s
    2000, // 2s
    5000, // 5s
    10000, // 10s
    20000 // 20s
];
// ==========================
// FAILURE HANDLER
// ==========================
async function handleFailure(job, error) {
    job.retryCount = (job.retryCount || 0) + 1;
    console.log("❌ JOB FAILED:", {
        url: job.url,
        retryCount: job.retryCount,
        error: error?.message || "UNKNOWN_ERROR"
    });
    // ==========================
    // RETRY FLOW
    // ==========================
    if (job.retryCount <= 5) {
        const delay = RETRY_DELAYS[job.retryCount - 1] || 20000;
        console.log("🔁 RETRY SCHEDULED:", {
            url: job.url,
            delay
        });
        setTimeout(async () => {
            await (0, redis_queue_1.addJob)(job);
        }, delay);
        return;
    }
    // ==========================
    // DLQ FLOW
    // ==========================
    await (0, dlq_1.moveToDLQ)(job, error?.message || "MAX_RETRIES_EXCEEDED");
    console.log("💀 MOVED TO DLQ:", job.url);
}
