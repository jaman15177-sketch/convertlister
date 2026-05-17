"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
// ==========================
// ENV VALIDATION LAYER
// ==========================
function required(key, defaultValue) {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`❌ Missing ENV: ${key}`);
    }
    return value;
}
// ==========================
// CONFIG OBJECT
// ==========================
exports.config = {
    REDIS_URL: required("REDIS_URL", "redis://127.0.0.1:6379"),
    MAX_RETRIES: Number(required("MAX_RETRIES", "5")),
    FINAL_DELAY: Number(required("FINAL_DELAY", "20000")),
    TIMEOUT: Number(required("TIMEOUT", "30000"))
};
