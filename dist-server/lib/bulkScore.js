"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateProduct = evaluateProduct;
function evaluateProduct(product) {
    return {
        score: Math.random() * 100,
        productId: product?.id,
    };
}
