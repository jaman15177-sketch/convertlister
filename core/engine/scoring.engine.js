"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
const trend_engine_1 = require("./trend.engine");
const saturation_engine_1 = require("./saturation.engine");
const margin_engine_1 = require("./margin.engine");
const velocity_engine_1 = require("./velocity.engine");
const competition_engine_1 = require("./competition.engine");
const trust_engine_1 = require("./trust.engine");
const penalty_engine_1 = require("./penalty.engine");
function calculateScore(product) {
    const trend = (0, trend_engine_1.trendScore)(product);
    const saturation = (0, saturation_engine_1.saturationScore)(product);
    const margin = (0, margin_engine_1.marginScore)(product);
    const velocity = (0, velocity_engine_1.velocityScore)(product);
    const competition = (0, competition_engine_1.competitionScore)(product);
    const trust = (0, trust_engine_1.trustScore)(product);
    const penalty = (0, penalty_engine_1.penaltyScore)(product);
    const weighted = trend * 0.25 +
        margin * 0.15 +
        velocity * 0.20 +
        trust * 0.20 +
        competition * 0.10 +
        saturation * 0.10;
    const finalScore = weighted - penalty;
    return Math.max(0, Math.min(Math.round(finalScore), 100));
}
