"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEventBus = void 0;
class LogEventBus {
    constructor() {
        this.listeners = [];
    }
    on(fn) {
        this.listeners.push(fn);
    }
    async emit(log) {
        await Promise.all(this.listeners.map((fn) => fn(log)));
    }
}
exports.logEventBus = new LogEventBus();
