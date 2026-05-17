"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canAcceptJob = canAcceptJob;
exports.enforceRateLimit = enforceRateLimit;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
// ==========================
// CONFIG
// ==========================
const MAX_QUEUE_SIZE = 500;
// ==========================
// CHECK QUEUE CAPACITY
// ==========================
async function canAcceptJob() {
    const size = await redis.llen("queue:jobs");
    console.log("📊 QUEUE SIZE:", size);
    return size < MAX_QUEUE_SIZE;
}
// ==========================
// OVERLOAD PROTECTION
// ==========================
async function enforceRateLimit() {
    const allowed = await canAcceptJob();
    if (!allowed) {
        throw new Error("QUEUE_OVERLOADED");
    }
}
