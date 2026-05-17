"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProduct = processProduct;
const supabase_client_1 = require("../../lib/supabase-client");
async function processProduct(product) {
    const supabase = (0, supabase_client_1.getSupabase)();
    // =====================
    // SCORE CALCULATION
    // =====================
    const score = Math.floor(Math.random() * 40) + 60;
    console.log("🏆 SCORE:", score);
    // =====================
    // WINNER LOGIC
    // =====================
    const isWinner = score >= 70;
    if (!isWinner) {
        console.log("❌ REJECTED:", product.title);
        return {
            status: "rejected",
            score
        };
    }
    // =====================
    // SAVE TO DB
    // =====================
    const { data, error } = await supabase
        .from("product_metrics")
        .insert({
        job_id: "auto",
        title: product.title,
        url: product.url,
        winning_score: score
    })
        .select()
        .single();
    if (error) {
        throw error;
    }
    return {
        status: "winner",
        data
    };
}
