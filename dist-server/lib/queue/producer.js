"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBatch = addBatch;
const bull_queue_1 = require("./bull.queue");
const MAX_BATCH_SIZE = 30;
async function addBatch(products) {
    // 🔥 ENFORCE LIMIT
    const limited = products.slice(0, MAX_BATCH_SIZE);
    const jobs = limited.map((p) => ({
        name: "IMPORT_PRODUCT",
        data: p,
    }));
    await bull_queue_1.importQueue.addBulk(jobs);
    console.log(`✔ Queued ${jobs.length}/${products.length} products (max ${MAX_BATCH_SIZE})`);
    // optional warning
    if (products.length > MAX_BATCH_SIZE) {
        console.warn(`⚠ Batch truncated to ${MAX_BATCH_SIZE}`);
    }
}
