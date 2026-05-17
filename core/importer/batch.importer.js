"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchImport = batchImport;
const source_manager_1 = require("./source.manager");
const import_queue_1 = require("../queue/import.queue");
async function batchImport(sources, limit = 30) {
    console.log("🚀 AUTO BATCH IMPORT START");
    let total = 0;
    for (const source of sources) {
        console.log(`📦 SOURCE: ${source}`);
        const adapter = (0, source_manager_1.getSourceAdapter)(source);
        if (!adapter) {
            console.log(`❌ NO ADAPTER: ${source}`);
            continue;
        }
        const products = await adapter.fetch(limit);
        console.log(`✅ IMPORTED: ${products.length}`);
        (0, import_queue_1.addToQueue)(products);
        total += products.length;
    }
    console.log("🏁 TOTAL QUEUED:", total);
    return total;
}
