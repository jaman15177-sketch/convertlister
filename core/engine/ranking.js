"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopProducts = getTopProducts;
const supabase_1 = require("../../lib/supabase");
async function getTopProducts(limit = 5) {
    const { data, error } = await supabase_1.supabase
        .from("product_metrics")
        .select("*")
        .order("winning_score", { ascending: false })
        .limit(limit);
    if (error) {
        console.error("❌ RANKING ERROR:", error.message);
        return [];
    }
    return data;
}
