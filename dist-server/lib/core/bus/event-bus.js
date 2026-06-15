"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = void 0;
const events_1 = require("events");
class EventBus extends events_1.EventEmitter {
    emitEvent(event, payload) {
        this.emit(event, payload);
    }
    onEvent(event, handler) {
        this.on(event, handler);
    }
}
exports.eventBus = new EventBus();
