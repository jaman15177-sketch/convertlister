"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJob = addJob;
exports.getNextJob = getNextJob;
exports.acknowledgeJob = acknowledgeJob;
exports.popJob = popJob;
const ioredis_1 = __importDefault(require("ioredis"));
const queue_rate_1 = require("../rate/queue.rate");
const redis = new ioredis_1.default();
// ==========================
// ADD JOB
// ==========================
async function addJob(job) {
    // ==========================
    // RATE LIMIT PROTECTION
    // ==========================
    await (0, queue_rate_1.enforceRateLimit)();
    // ==========================
    // IDEMPOTENCY CHECK
    // ==========================
    const exists = await redis.get(`dedupe:${job.urlHash}`);
    if (exists) {
        console.log("⚠️ DUPLICATE BLOCKED:", job.url);
        return;
    }
    // ==========================
    // REGISTER DEDUPE
    // ==========================
    await redis.set(`dedupe:${job.urlHash}`, "1");
    // ==========================
    // PUSH TO QUEUE
    // ==========================
    await redis.lpush("queue:jobs", JSON.stringify(job));
    console.log("📥 JOB ACCEPTED:", job.url);
}
// ==========================
// FETCH NEXT JOB
// ==========================
async function getNextJob() {
    const job = await redis.brpoplpush("queue:jobs", "queue:processing", 0);
    return job
        ? JSON.parse(job)
        : null;
}
// ==========================
// ACKNOWLEDGE JOB
// ==========================
async function acknowledgeJob(job) {
    await redis.lrem("queue:processing", 1, JSON.stringify(job));
    console.log("✅ ACK DONE:", job.url);
}
async function popJob() {
    const job = await redis.brpoplpush("queue:jobs", "queue:processing", 0);
    return job ? JSON.parse(job) : null;
}
