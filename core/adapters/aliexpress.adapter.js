"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliexpressAdapter = void 0;
exports.aliexpressAdapter = {
    async fetch(limit) {
        const products = [];
        for (let i = 1; i <= limit; i++) {
            products.push({
                id: `ali-${i}`,
                title: `AliExpress Product ${i}`,
                url: "https://aliexpress.com",
                price: Math.random() * 80,
                rating: 3 + Math.random() * 2,
                reviews: Math.floor(Math.random() * 500),
                source: "aliexpress"
            });
        }
        return products;
    }
};
