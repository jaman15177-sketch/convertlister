"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSaturation = calculateSaturation;
function calculateSaturation(reviews) {
    // LOWER COMPETITION = HIGH SCORE
    if (reviews > 10000)
        return 20;
    if (reviews > 5000)
        return 40;
    if (reviews > 2000)
        return 65;
    if (reviews > 500)
        return 85;
    return 100;
}
