"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRetryDelay = getRetryDelay;
const retry_config_1 = require("./retry.config");
function getRetryDelay(retryCount) {
    const base = retry_config_1.RETRY_DELAYS[retryCount] || 20000;
    const jitter = Math.floor(Math.random() * 1000);
    return base + jitter;
}
