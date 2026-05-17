"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliexpressAdapter = exports.AliExpressAdapter = void 0;
const normalize_1 = require("../importer/normalize");
class AliExpressAdapter {
    constructor() {
        this.appKey = process.env.ALIEXPRESS_APP_KEY;
        this.appSecret = process.env.ALIEXPRESS_APP_SECRET;
        this.trackingId = process.env.ALIEXPRESS_TRACKING_ID;
    }
    async fetch(limit) {
        try {
            const url = "https://api-sg.aliexpress.com/sync";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-key": this.appKey
                },
                body: JSON.stringify({
                    method: "aliexpress.product.search",
                    app_signature: this.appSecret,
                    trackingId: this.trackingId,
                    page_size: limit
                })
            });
            const data = await response.json();
            const products = data?.result?.products || [];
            return products.map((p) => (0, normalize_1.normalizeProduct)(p, "aliexpress"));
        }
        catch (err) {
            console.log("❌ ALIEXPRESS API ERROR:", err);
            return [];
        }
    }
}
exports.AliExpressAdapter = AliExpressAdapter;
exports.aliexpressAdapter = new AliExpressAdapter();
