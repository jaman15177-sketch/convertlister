"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDemandScore = calculateDemandScore;
/**
 * 📊 DEMAND SCORE ENGINE
 * Purpose: Measure "how much people are searching / wanting this"
 *
 * Core idea:
 * - Volume = direct demand
 * - Keyword strength = implicit demand
 * - Normalized to avoid bias from huge numbers
 */
function calculateDemandScore(signal) {
    const volume = signal.volume ?? 0;
    // 🧠 STEP 1: base demand (log scaling prevents domination of huge values)
    const baseDemand = Math.log1p(volume);
    // log1p(x) = log(1 + x)
    // 🧠 STEP 2: keyword intent boost (soft signal)
    const keyword = signal.keyword.toLowerCase();
    let intentBoost = 0;
    // High-buy intent keywords
    const highIntentKeywords = [
        "buy",
        "best",
        "cheap",
        "price",
        "review",
        "vs",
        "top",
        "under",
        "affordable",
        "deal",
    ];
    for (const word of highIntentKeywords) {
        if (keyword.includes(word)) {
            intentBoost += 1.5;
        }
    }
    // 🧠 STEP 3: platform bias (optional tuning layer)
    let platformBoost = 0;
    if (signal.metadata?.platform === "google") {
        platformBoost = 2;
    }
    else if (signal.metadata?.platform === "tiktok") {
        platformBoost = 1.2;
    }
    else if (signal.metadata?.platform === "reddit") {
        platformBoost = 1;
    }
    else if (signal.metadata?.platform === "aliexpress") {
        platformBoost = 2.5; // strong buying intent platform
    }
    // 📊 FINAL DEMAND SCORE
    const demandScore = baseDemand * 10 + intentBoost * 5 + platformBoost * 3;
    return Math.round(demandScore * 100) / 100;
}
