"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalStore = void 0;
class UniversalStore {
    constructor() {
        this.store = new Map();
    }
    set(key, value) {
        this.store.set(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
    delete(key) {
        this.store.delete(key);
    }
    clear() {
        this.store.clear();
    }
}
exports.globalStore = new UniversalStore();
