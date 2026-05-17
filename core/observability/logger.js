"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (msg, meta) => {
        console.log(`🟢 INFO: ${msg}`, meta || "");
    },
    success: (msg, meta) => {
        console.log(`✅ SUCCESS: ${msg}`, meta || "");
    },
    error: (msg, meta) => {
        console.log(`❌ ERROR: ${msg}`, meta || "");
    },
    warn: (msg, meta) => {
        console.log(`⚠️ WARN: ${msg}`, meta || "");
    }
};
