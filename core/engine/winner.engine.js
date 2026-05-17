"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectWinner = detectWinner;
const scoring_engine_1 = require("./scoring.engine");
const thresholds_1 = require("./thresholds");
async function detectWinner(product) {
    const score = (0, scoring_engine_1.calculateScore)(product);
    console.log("🏆 SCORE:", score);
    console.log("🎯 THRESHOLD:", thresholds_1.WINNER_THRESHOLD);
    const isWinner = Number(score) >=
        Number(thresholds_1.WINNER_THRESHOLD);
    console.log("🟢 WINNER:", isWinner);
    return {
        ...product,
        score,
        winner: isWinner,
        greenTick: isWinner,
        status: isWinner
            ? "winner"
            : "rejected"
    };
}
