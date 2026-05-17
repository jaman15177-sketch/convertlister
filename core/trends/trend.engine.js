"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTrendScore = calculateTrendScore;
const velocity_engine_1 = require("./velocity.engine");
const saturation_engine_1 = require("./saturation.engine");
// ==========================
// MAIN TREND ENGINE
// ==========================
function calculateTrendScore(product) {
    const reviews = product.reviews_count;
    // =========================
    // VELOCITY (growth signal)
    // =========================
    const velocity = (0, velocity_engine_1.calculateVelocity)(reviews);
    // =========================
    // SATURATION (competition)
    // =========================
    const saturation = (0, saturation_engine_1.calculateSaturation)(reviews);
    // =========================
    // FINAL TREND SCORE
    // =========================
    const trend_score = Math.round(velocity * 0.65 +
        saturation * 0.35);
    // =========================
    // CLASSIFICATION
    // =========================
    let category = "FAILED";
    if (trend_score >= 80)
        category = "HOT";
    else if (trend_score >= 60)
        category = "NORMAL";
    else
        category = "FAILED";
    return {
        trend_score,
        velocity_score: velocity,
        saturation_score: saturation,
        is_trending: trend_score >= 70,
        category
    };
}
