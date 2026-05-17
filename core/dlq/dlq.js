"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveToDLQ = moveToDLQ;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
/**
 * MOVE JOB TO DEAD LETTER QUEUE
 */
async function moveToDLQ(job, reason) {
    const dlqJob = {
        ...job,
        failedAt: Date.now(),
        reason
    };
    await redis.lpush("queue:dlq", JSON.stringify(dlqJob));
    console.log("💀 MOVED TO DLQ:", job.url, reason);
}
