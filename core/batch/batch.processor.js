"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBatch = processBatch;
const scorer_1 = require("../engine/scorer");
const winner_filter_1 = require("../engine/winner.filter");
const optimizer_1 = require("../engine/optimizer");
const trend_engine_1 = require("../trends/trend.engine");
// =========================
// 🆕 DATABASE PIPELINE
// =========================
const winner_repo_1 = require("../database/winner.repo");
async function processBatch(products) {
    const winners = [];
    for (const product of products) {
        console.log("⚙️ PROCESSING:", product.title);
        // =========================
        // AI SCORE
        // =========================
        const aiScore = (0, scorer_1.calculateWinningScore)(product);
        // =========================
        // TREND SCORE
        // =========================
        const trend = (0, trend_engine_1.calculateTrendScore)(product);
        const finalScore = Math.round(aiScore * 0.6 +
            trend.trend_score * 0.4);
        // =========================
        // FILTER
        // =========================
        if (!(0, winner_filter_1.isWinningProduct)(finalScore)) {
            console.log("❌ REJECTED:", product.title);
            continue;
        }
        // =========================
        // OPTIMIZE
        // =========================
        const optimized = (0, optimizer_1.optimizeProduct)(product.title);
        const winnerProduct = {
            ...product,
            ai_score: aiScore,
            trend_score: trend.trend_score,
            final_score: finalScore,
            category: trend.category,
            optimized
        };
        console.log("🏆 WINNER SAVED:", product.title);
        // =========================
        // 💾 SAVE TO DATABASE
        // =========================
        await (0, winner_repo_1.saveWinnerProduct)(winnerProduct);
        winners.push(winnerProduct);
        await new Promise(r => setTimeout(r, 500));
    }
    return winners;
}
