"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redis_1 = require("./redis");
const import_engine_1 = require("../../core/import/engine/import.engine");
if (globalThis.__importWorkerStarted) {
    console.log("⚠ Worker already running — skipping duplicate init");
}
else {
    globalThis.__importWorkerStarted = true;
    console.log("🚀 Import Worker Starting...");
    const worker = new bullmq_1.Worker("IMPORT_QUEUE", async (job) => {
        const product = job.data;
        console.log("⚙ Processing:", product.id);
        try {
            const result = await import_engine_1.importEngine.importProduct(product);
            if (!result.success) {
                throw new Error("IMPORT_FAILED");
            }
            return result;
        }
        catch (err) {
            console.error("❌ JOB FAILED:", product.id, err);
            throw err;
        }
    }, {
        connection: redis_1.redis,
        concurrency: 1, // 🔥 SEQUENTIAL PROCESSING
    });
    // -----------------------------------------
    // WORKER EVENTS (DEBUG)
    // -----------------------------------------
    worker.on("completed", (job) => {
        console.log("✔ COMPLETED:", job.id);
    });
    worker.on("failed", (job, err) => {
        console.log("❌ FAILED:", job?.id, err.message);
    });
    console.log("✅ Worker Ready (Singleton Mode)");
}
