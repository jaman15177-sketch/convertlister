"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decideWinner = decideWinner;
const niche_engine_1 = require("./niche.engine");
const trend_momentum_engine_1 = require("./trend.momentum.engine");
const saturation_engine_1 = require("./saturation.engine");
const blacklist_engine_1 = require("./blacklist.engine");
const fake_review_engine_1 = require("./fake-review.engine");
const historical_engine_1 = require("./historical.engine");
function decideWinner(product) {
    // 🧠 SIGNAL LAYERS
    const niche = (0, niche_engine_1.nicheScore)(product);
    const trend = (0, trend_momentum_engine_1.trendMomentum)(product);
    const saturation = (0, saturation_engine_1.saturationEngine)(product);
    const history = (0, historical_engine_1.historicalEngine)(product);
    // ⚠️ PENALTY LAYERS
    const blacklistPenalty = (0, blacklist_engine_1.blacklistEngine)(product);
    const fakePenalty = (0, fake_review_engine_1.fakeReviewEngine)(product);
    // 🚀 FINAL SCORE BUILD
    const rawScore = niche +
        trend +
        saturation +
        history;
    const penalty = blacklistPenalty +
        fakePenalty;
    const finalScore = rawScore - penalty;
    // 🧠 NORMALIZATION
    const score = Math.max(0, Math.min(100, Math.round(finalScore)));
    // 🚀 DECISION LOGIC
    const isWinner = score >= 75;
    return {
        product,
        score,
        winner: isWinner,
        greenTick: isWinner,
        status: isWinner
            ? "winner"
            : "rejected"
    };
}
