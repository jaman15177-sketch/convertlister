"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRecovery = runRecovery;
const ioredis_1 = __importDefault(require("ioredis"));
const redis_queue_1 = require("../queue/redis.queue");
const redis = new ioredis_1.default();
const STUCK_TIME = 60 * 1000; // 60 sec threshold
async function runRecovery() {
    console.log("♻️ CRASH RECOVERY STARTED");
    const processing = await redis.lrange("queue:processing", 0, -1);
    for (const item of processing) {
        const job = JSON.parse(item);
        const age = Date.now() - (job.startedAt || Date.now());
        // =========================
        // STUCK JOB DETECTION
        // =========================
        if (age > STUCK_TIME) {
            console.log("🔁 RECOVERING JOB:", job.url);
            // remove from processing
            await redis.lrem("queue:processing", 1, item);
            // requeue safely
            await (0, redis_queue_1.addJob)(job);
        }
    }
    console.log("🏁 RECOVERY COMPLETE");
}
