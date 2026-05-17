"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amazonAdapter = void 0;
exports.amazonAdapter = {
    async fetch(limit) {
        const products = [];
        for (let i = 1; i <= limit; i++) {
            products.push({
                id: `amazon-${i}`,
                title: `Amazon Product ${i}`,
                url: "https://amazon.com",
                price: Math.floor(Math.random() * 100),
                rating: 4 + Math.random(),
                reviews: Math.floor(Math.random() * 1000),
                source: "amazon"
            });
        }
        return products;
    }
};
