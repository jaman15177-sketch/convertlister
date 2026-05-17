"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuplicate = isDuplicate;
exports.registerJob = registerJob;
exports.clearJob = clearJob;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const TTL = 60 * 60; // 1 hour
/**
 * CHECK + LOCK (ATOMICS)
 */
async function isDuplicate(urlHash) {
    const exists = await redis.exists(`dedupe:${urlHash}`);
    return exists === 1;
}
/**
 * REGISTER JOB (LOCK KEY)
 */
async function registerJob(urlHash) {
    await redis.set(`dedupe:${urlHash}`, "1", "EX", TTL);
}
/**
 * REMOVE (optional cleanup)
 */
async function clearJob(urlHash) {
    await redis.del(`dedupe:${urlHash}`);
}
