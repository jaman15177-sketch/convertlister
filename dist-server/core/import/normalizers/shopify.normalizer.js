"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopifyNormalizer = exports.ShopifyNormalizer = void 0;
class ShopifyNormalizer {
    async normalize(raw) {
        const payload = raw.payload;
        const price = payload.variants?.[0]?.price ?? "0";
        const images = payload.images
            ?.map((img) => img.src)
            .filter((src) => typeof src === "string" &&
            src.length > 0) ?? [];
        const now = new Date();
        return {
            id: crypto.randomUUID(),
            source: "shopify",
            sourceProductId: String(payload.id),
            version: 1,
            title: payload.title ?? "",
            description: payload.body_html ?? "",
            price: Number(price),
            currency: "USD",
            images,
            status: "imported",
            intelligence: {
                category: "unknown",
                marketFitScore: 0,
                trendScore: 0,
                winningProbability: 0,
            },
            metadata: {
                handle: payload.handle,
                shopifyStatus: payload.status,
            },
            createdAt: now,
            updatedAt: now,
        };
    }
}
exports.ShopifyNormalizer = ShopifyNormalizer;
exports.shopifyNormalizer = new ShopifyNormalizer();
