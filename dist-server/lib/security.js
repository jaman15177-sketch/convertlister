"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertServerOnly = assertServerOnly;
function assertServerOnly() {
    if (typeof window !== "undefined") {
        throw new Error("❌ SECURITY ERROR: Server-only key accessed in browser");
    }
}
