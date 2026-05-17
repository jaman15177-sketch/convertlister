"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVelocity = calculateVelocity;
function calculateVelocity(reviews) {
    // FAST GROWTH = HIGH VELOCITY
    if (reviews > 8000)
        return 100;
    if (reviews > 3000)
        return 85;
    if (reviews > 1000)
        return 70;
    if (reviews > 500)
        return 55;
    return 30;
}
