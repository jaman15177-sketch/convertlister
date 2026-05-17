"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importQueue = void 0;
exports.addToQueue = addToQueue;
exports.nextProduct = nextProduct;
exports.queueSize = queueSize;
exports.importQueue = [];
function addToQueue(products) {
    exports.importQueue.push(...products);
    console.log(`📦 QUEUED: ${products.length}`);
}
function nextProduct() {
    return exports.importQueue.shift();
}
function queueSize() {
    return exports.importQueue.length;
}
