"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueue = processQueue;
const import_queue_1 = require("../queue/import.queue");
const winner_pipeline_1 = require("../pipeline/winner.pipeline");
async function processQueue() {
    console.log("⚙️ PROCESSING START");
    while (true) {
        const product = (0, import_queue_1.nextProduct)();
        if (!product) {
            console.log("🏁 QUEUE EMPTY");
            break;
        }
        try {
            console.log("⚙️ PROCESSING:", product.title);
            const result = await (0, winner_pipeline_1.processProduct)(product);
            // =====================
            // SAFE CHECK
            // =====================
            if (!result) {
                console.log("⚠️ SKIPPED NULL RESULT");
                continue;
            }
            console.log("📊 RESULT:", result.status);
        }
        catch (err) {
            console.log("❌ ERROR:", err);
        }
    }
}
