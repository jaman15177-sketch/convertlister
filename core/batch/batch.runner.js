"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBatch = runBatch;
const amazon_importer_1 = require("../importer/amazon.importer");
const supabase_client_1 = require("../../lib/supabase-client");
async function runBatch() {
    console.log("🚀 BATCH STARTED");
    const products = await (0, amazon_importer_1.fetchAmazonProducts)();
    for (const p of products) {
        console.log("⚙️ PROCESSING:", p.title);
        const score = Math.floor(Math.random() * 100);
        const isWinner = score > 70;
        if (!isWinner) {
            console.log("❌ REJECTED:", p.title);
            continue;
        }
        await supabase_client_1.supabase
            .from("product_metrics")
            .insert({
            ...p,
            winning_score: score
        });
        console.log("✅ WINNER SAVED:", p.title);
    }
    console.log("🏁 BATCH COMPLETE");
}
