"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdapter = getAdapter;
const amazon_adapter_1 = require("../adapters/amazon.adapter");
const aliexpress_adapter_1 = require("../adapters/aliexpress.adapter");
const cj_adapter_1 = require("../adapters/cj.adapter");
function getAdapter(source) {
    const map = {
        amazon: amazon_adapter_1.amazonAdapter,
        aliexpress: aliexpress_adapter_1.aliexpressAdapter,
        cj: cj_adapter_1.cjAdapter
    };
    return map[source] || null;
}
