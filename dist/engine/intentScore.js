"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIntentScore = calculateIntentScore;
/**
 * 🎯 INTENT SCORE ENGINE
 * Purpose: Detect "BUYING READINESS"
 *
 * Core idea:
 * - keyword signals = explicit intent
 * - platform = purchase proximity
 * - metadata = behavioral confirmation
 */
function calculateIntentScore(signal) {
    const keyword = signal.keyword.toLowerCase();
    // 🧠 STEP 1: explicit high-intent keywords
    const highIntentWords = [
        "buy",
        "best",
        "cheap",
        "price",
        "deal",
        "discount",
        "review",
        "vs",
        "under",
        "affordable",
        "order",
        "shop",
    ];
    let keywordScore = 0;
    for (const word of highIntentWords) {
        if (keyword.includes(word)) {
            keywordScore += 8;
        }
    }
    // 🧠 STEP 2: implicit intent patterns (strong buying signals)
    const implicitPatterns = [
        /best .* for/i,
        /top .* under/i,
        /cheap .* online/i,
        /where to buy/i,
        /is .* worth it/i,
    ];
    let patternScore = 0;
    for (const pattern of implicitPatterns) {
        if (pattern.test(keyword)) {
            patternScore += 15;
        }
    }
    // 🧠 STEP 3: platform purchase proximity
    let platformScore = 0;
    const platform = signal.metadata?.platform;
    if (platform === "aliexpress") {
        platformScore = 25; // direct buyer market
    }
    else if (platform === "amazon") {
        platformScore = 22;
    }
    else if (platform === "tiktok") {
        platformScore = 18; // impulse buying
    }
    else if (platform === "google") {
        platformScore = 15; // search intent
    }
    else if (platform === "reddit") {
        platformScore = 10; // early awareness stage
    }
    // 🧠 STEP 4: behavioral confirmation
    let behaviorScore = 0;
    if (signal.metadata?.productIntent) {
        behaviorScore += 30;
    }
    if (signal.metadata?.adSpotted) {
        behaviorScore += 20;
    }
    // 🧠 STEP 5: engagement proxy (soft intent signal)
    const engagement = signal.engagement ?? 0;
    const engagementScore = Math.log1p(engagement) * 2;
    // 📊 FINAL INTENT SCORE
    const intentScore = keywordScore +
        patternScore +
        platformScore +
        behaviorScore +
        engagementScore;
    return Math.round(intentScore * 100) / 100;
}
