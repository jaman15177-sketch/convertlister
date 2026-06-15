"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dlq = void 0;
/**
 * ==========================================================
 * DEAD LETTER QUEUE (IN-MEMORY)
 * ==========================================================
 */
class DeadLetterQueue {
    constructor() {
        this.store = [];
    }
    push(job) {
        this.store.push(job);
    }
    getAll() {
        return this.store;
    }
    count() {
        return this.store.length;
    }
    clear() {
        this.store = [];
    }
}
exports.dlq = new DeadLetterQueue();
