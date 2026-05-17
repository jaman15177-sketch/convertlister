"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.competitionScore = competitionScore;
function competitionScore(product) {
    let score = 100;
    if (product.reviews > 3000)
        score -= 40;
    if (product.rating > 4.8)
        score -= 20;
    return score;
}
