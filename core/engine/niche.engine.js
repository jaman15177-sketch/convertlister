"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nicheScore = nicheScore;
function nicheScore(product) {
    const niche = product.category || "general";
    const rules = {
        electronics: {
            minRating: 4.3,
            minReviews: 200
        },
        fashion: {
            minRating: 4.0,
            minReviews: 100
        },
        beauty: {
            minRating: 4.5,
            minReviews: 300
        },
        home: {
            minRating: 4.2,
            minReviews: 150
        },
        general: {
            minRating: 4.2,
            minReviews: 150
        }
    };
    const rule = rules[niche] || rules.general;
    let score = 0;
    if (product.rating >= rule.minRating)
        score += 40;
    if (product.reviews >= rule.minReviews)
        score += 40;
    return score;
}
