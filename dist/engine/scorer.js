"use strict";
// src/engine/scorer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.score = score;
/**
 * 🔥 MINEA-STYLE SCORING ENGINE
 * Core idea: detect "market attention + momentum + intent"
 *
 * Score = weighted combination of:
 * - volume (demand)
 * - velocity (growth)
 * - engagement (attention strength)
 * - bonus signals (optional metadata)
 */
function score(signal) {
    const volume = signal.volume ?? 0;
    const velocity = signal.velocity ?? 0;
    const engagement = signal.engagement ?? 0;
    // 🧠 Core weighted model (tuned for trend detection)
    const volumeScore = volume * 0.4;
    const velocityScore = velocity * 1.8;
    const engagementScore = engagement * 1.2;
    // ⚡ Bonus intelligence layer (future-proofing)
    let bonus = 0;
    if (signal.metadata?.productIntent) {
        bonus += 50; // buying intent = HIGH VALUE signal
    }
    if (signal.metadata?.adSpotted) {
        bonus += 30; // ad presence = commercial validation
    }
    if (signal.metadata?.confidenceScore) {
        bonus += signal.metadata.confidenceScore * 0.2;
    }
    // 📊 Final score calculation
    const finalScore = volumeScore + velocityScore + engagementScore + bonus;
    return Math.round(finalScore);
}
