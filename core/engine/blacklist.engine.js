"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistEngine = blacklistEngine;
const blacklist = [
    "fake",
    "counterfeit",
    "replica",
    "clone"
];
function blacklistEngine(product) {
    const title = (product.title || "").toLowerCase();
    let penalty = 0;
    blacklist.forEach(word => {
        if (title.includes(word))
            penalty += 100;
    });
    return penalty;
}
