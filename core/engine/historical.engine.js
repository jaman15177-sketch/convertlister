"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historicalEngine = historicalEngine;
const historyDB = [];
function historicalEngine(product) {
    const exists = historyDB.find(p => p.id === product.id);
    if (exists)
        return -10;
    historyDB.push(product);
    return 5;
}
