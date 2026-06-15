"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = exports.ProductStore = void 0;
class ProductStore {
    constructor() {
        this.products = new Map();
    }
    /**
     * ADD PRODUCT
     */
    add(product) {
        console.log("📦 STORE ADD:", product.id);
        this.products.set(product.id, product);
        console.log("✔ STORED:", product.id);
        return product;
    }
    /**
     * GET SINGLE PRODUCT
     */
    get(id) {
        return this.products.get(id);
    }
    /**
     * EXISTS CHECK
     */
    exists(id) {
        return this.products.has(id);
    }
    /**
     * GET ALL PRODUCTS
     */
    getAll() {
        return Array.from(this.products.values());
    }
    /**
     * COUNT
     */
    count() {
        return this.products.size;
    }
    /**
     * FILTER BY SOURCE
     */
    getBySource(source) {
        return this.getAll().filter((p) => p.source === source);
    }
    /**
     * FILTER BY STATUS
     */
    getByStatus(status) {
        return this.getAll().filter((p) => p.status === status);
    }
    /**
     * UPDATE PRODUCT
     */
    update(id, updates) {
        const current = this.products.get(id);
        if (!current) {
            console.log("❌ UPDATE FAILED:", id);
            return null;
        }
        const updated = {
            ...current,
            ...updates,
            version: current.version + 1,
            updatedAt: new Date(),
        };
        this.products.set(id, updated);
        console.log("🔄 UPDATED:", id);
        return updated;
    }
    /**
     * UPDATE STATUS
     */
    updateStatus(id, status) {
        return this.update(id, { status });
    }
    /**
     * UPDATE INTELLIGENCE
     */
    updateIntelligence(id, intelligence) {
        return this.update(id, { intelligence });
    }
    /**
     * REMOVE PRODUCT
     */
    remove(id) {
        console.log("🗑 REMOVE:", id);
        return this.products.delete(id);
    }
    /**
     * CLEAR STORE
     */
    clear() {
        console.log("⚠ STORE CLEARED");
        this.products.clear();
    }
    /**
     * SAFE SNAPSHOT
     */
    dump() {
        return Object.freeze(this.getAll());
    }
}
exports.ProductStore = ProductStore;
/**
 * SINGLETON INSTANCE
 */
exports.productStore = new ProductStore();
