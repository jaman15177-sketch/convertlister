"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWinnerProduct = saveWinnerProduct;
const supabase_1 = require("../../lib/supabase");
// =========================
// SAVE WINNER PRODUCT
// =========================
async function saveWinnerProduct(product) {
    const { data, error } = await supabase_1.supabase
        .from("product_metrics")
        .insert([{
            job_id: product.job_id || null,
            url: product.url || null,
            title: product.title,
            price: product.price,
            rating: product.rating,
            reviews_count: product.reviews_count,
            ai_score: product.ai_score,
            trend_score: product.trend_score,
            winning_score: product.final_score,
            category: product.category,
            optimized_title: product.optimized
                ?.optimizedTitle,
            optimized_description: product.optimized
                ?.optimizedDescription
        }]);
    if (error) {
        console.error("❌ DB INSERT ERROR:", error.message);
        return null;
    }
    return data;
}
