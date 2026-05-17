"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFeatures = extractFeatures;
function extractFeatures(product) {
    return {
        rating: product.rating,
        reviews_count: product.reviews_count,
        price: product.price,
        title_length: product.title?.length || 0,
        has_image: !!product.image,
        trending: product.trending || false
    };
}
