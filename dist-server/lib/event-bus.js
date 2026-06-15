"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEventBus = void 0;
const events_1 = require("events");
class LogEventBus extends events_1.EventEmitter {
}
exports.logEventBus = new LogEventBus();
