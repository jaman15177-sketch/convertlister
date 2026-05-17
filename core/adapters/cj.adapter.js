"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cjAdapter = void 0;
exports.cjAdapter = {
    async fetch(limit) {
        const products = [];
        for (let i = 1; i <= limit; i++) {
            products.push({
                id: `cj-${i}`,
                title: `CJ Product ${i}`,
                url: "https://cjdropshipping.com",
                price: Math.floor(Math.random() * 120),
                rating: 4 + Math.random(),
                reviews: Math.floor(Math.random() * 800),
                source: "cj"
            });
        }
        return products;
    }
};
