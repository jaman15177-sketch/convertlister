"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAmazonProducts = fetchAmazonProducts;
async function fetchAmazonProducts() {
    // 🔥 MOCK (replace later with scraper / API)
    const products = [];
    for (let i = 1; i <= 30; i++) {
        products.push({
            job_id: `amazon-${i}`,
            url: `https://amazon.com/product-${i}`,
            title: `Amazon Product ${i}`,
            price: Math.floor(Math.random() * 100),
            rating: 3 + Math.random() * 2,
            reviews_count: Math.floor(Math.random() * 5000)
        });
    }
    return products;
}
