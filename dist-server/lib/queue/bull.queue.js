"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("./redis");
/**
 * ==========================================================
 * IMPORT QUEUE (PRODUCTION READY)
 * ==========================================================
 * - Redis persistent queue
 * - Retry enabled (3 times)
 * - Exponential backoff
 * - Safe completion cleanup
 * ==========================================================
 */
exports.importQueue = new bullmq_1.Queue("IMPORT_QUEUE", {
    connection: redis_1.redis,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});
