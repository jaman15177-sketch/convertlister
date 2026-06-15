"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedupeEngine = exports.DedupeEngine = void 0;
/**
 * ==========================================================
 * DEDUPE ENGINE
 * ==========================================================
 * Responsibilities:
 * - Detect duplicate products
 * - Prevent double imports
 * - Keep Universal Store clean
 * - Source-agnostic
 * ==========================================================
 */
class DedupeEngine {
    constructor() {
        /**
         * Runtime dedupe index
         *
         * key format:
         * source:sourceProductId
         */
        this.index = new Map();
    }
    async check(product) {
        const key = this.buildKey(product.source, product.sourceProductId);
        const existingProductId = this.index.get(key);
        if (existingProductId) {
            return {
                duplicate: true,
                existingProductId,
            };
        }
        this.index.set(key, product.id);
        return {
            duplicate: false,
        };
    }
    /**
     * Manual registration
     * Useful when loading existing products
     */
    register(product) {
        const key = this.buildKey(product.source, product.sourceProductId);
        this.index.set(key, product.id);
    }
    /**
     * Remove product from dedupe index
     */
    remove(source, sourceProductId) {
        const key = this.buildKey(source, sourceProductId);
        this.index.delete(key);
    }
    /**
     * Clear runtime state
     */
    clear() {
        this.index.clear();
    }
    /**
     * Stats
     */
    size() {
        return this.index.size;
    }
    buildKey(source, sourceProductId) {
        return `${source}:${sourceProductId}`;
    }
}
exports.DedupeEngine = DedupeEngine;
/**
 * Singleton instance
 */
exports.dedupeEngine = new DedupeEngine();
