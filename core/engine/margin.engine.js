"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marginScore = marginScore;
function marginScore(product) {
    let score = 0;
    if (product.price >= 20)
        score += 30;
    if (product.price <= 60)
        score += 30;
    return score;
}
