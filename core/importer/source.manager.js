"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceAdapter = getSourceAdapter;
const adapter_registry_1 = require("./adapter.registry");
function getSourceAdapter(source) {
    const adapter = (0, adapter_registry_1.getAdapter)(source);
    if (!adapter) {
        console.log("❌ NO ADAPTER FOUND:", source);
        return null;
    }
    return adapter;
}
