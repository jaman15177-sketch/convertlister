"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trustScore = trustScore;
function trustScore(product) {
    let score = 0;
    if (product.rating >= 4.3)
        score += 40;
    if (product.reviews >= 100)
        score += 30;
    return score;
}
