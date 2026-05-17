"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.penaltyScore = penaltyScore;
function penaltyScore(product) {
    let penalty = 0;
    if (product.rating < 4.0)
        penalty += 20;
    if (product.reviews < 20)
        penalty += 15;
    if (product.price > 100)
        penalty += 20;
    return penalty;
}
