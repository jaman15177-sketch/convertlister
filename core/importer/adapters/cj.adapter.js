"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCJ = importCJ;
const normalize_1 = require("../normalize");
async function importCJ(limit = 30) {
    const products = [];
    for (let i = 1; i <= limit; i++) {
        const raw = {
            id: `cj-${i}`,
            title: `CJ Product ${i}`,
            price: Math.floor(Math.random() * 60) + 10,
            rating: Number((Math.random() * 2 + 3).toFixed(1)),
            reviews_count: Math.floor(Math.random() * 6000),
            image: "https://placehold.co/300",
            url: `https://cjdropshipping.com/${i}`
        };
        products.push((0, normalize_1.normalizeProduct)(raw, "cj"));
    }
    return products;
}
