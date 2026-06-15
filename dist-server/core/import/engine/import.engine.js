"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importEngine = exports.ImportEngine = void 0;
const store_1 = require("../../platform/store");
const product_validator_1 = require("../validators/product.validator");
const dedupe_engine_1 = require("../dedupe/dedupe.engine");
const shopify_normalizer_1 = require("../normalizers/shopify.normalizer");
/**
 * ==========================================================
 * IMPORT ENGINE (FINAL STABLE PRODUCTION VERSION)
 * ==========================================================
 * Pipeline:
 * Raw → Validate → Normalize → Dedupe → Store
 * ==========================================================
 */
class ImportEngine {
    /**
     * MAIN IMPORT ENTRY
     */
    async importProduct(raw) {
        try {
            // -----------------------------------------
            // 1. VALIDATION
            // -----------------------------------------
            const validation = product_validator_1.productValidator.validate(raw);
            if (!validation.valid) {
                console.log("❌ VALIDATION FAILED:", validation.errors);
                return {
                    success: false,
                    source: raw.source,
                    importedCount: 0,
                    duplicateCount: 0,
                    failedCount: 1,
                    errors: validation.errors,
                };
            }
            // -----------------------------------------
            // 2. NORMALIZATION
            // -----------------------------------------
            const normalizer = this.resolveNormalizer(raw.source);
            const normalized = await normalizer.normalize(raw);
            // -----------------------------------------
            // 3. DEDUPLICATION
            // -----------------------------------------
            const dedupe = await dedupe_engine_1.dedupeEngine.check(normalized);
            if (dedupe.duplicate) {
                console.log("⚠ DUPLICATE SKIPPED:", normalized.id);
                return {
                    success: true,
                    source: raw.source,
                    importedCount: 0,
                    duplicateCount: 1,
                    failedCount: 0,
                    errors: [],
                };
            }
            // -----------------------------------------
            // 4. SAFE STATUS VALIDATION
            // -----------------------------------------
            const allowedStatus = [
                "imported",
                "processing",
                "analyzed",
                "optimized",
                "distributed",
                "archived",
                "published",
            ];
            const safeStatus = allowedStatus.includes(normalized.status)
                ? normalized.status
                : "imported";
            console.log("📊 STATUS:", safeStatus);
            // -----------------------------------------
            // 5. BUILD STORE RECORD
            // -----------------------------------------
            const record = {
                id: normalized.id,
                source: normalized.source,
                sourceProductId: normalized.sourceProductId,
                version: normalized.version,
                title: normalized.title,
                description: normalized.description,
                price: normalized.price,
                currency: normalized.currency,
                images: normalized.images,
                status: safeStatus,
                intelligence: normalized.intelligence,
                metadata: normalized.metadata,
                createdAt: normalized.createdAt,
                updatedAt: normalized.updatedAt,
            };
            // -----------------------------------------
            // 6. STORE DEBUG TRACE
            // -----------------------------------------
            console.log("🔥 BEFORE STORE:", record.id);
            const stored = store_1.productStore.add(record);
            console.log("🔥 AFTER STORE:", stored.id);
            // -----------------------------------------
            // 7. STORE VERIFICATION
            // -----------------------------------------
            const verify = store_1.productStore.get(record.id);
            if (!verify) {
                console.error("❌ STORE WRITE FAILED:", record.id);
                throw new Error("STORE_WRITE_FAILED");
            }
            console.log("✔ STORE VERIFIED:", verify.id);
            // -----------------------------------------
            // SUCCESS RESPONSE
            // -----------------------------------------
            return {
                success: true,
                source: raw.source,
                importedCount: 1,
                duplicateCount: 0,
                failedCount: 0,
                errors: [],
            };
        }
        catch (err) {
            console.error("❌ IMPORT ENGINE ERROR:", err);
            return {
                success: false,
                source: raw.source,
                importedCount: 0,
                duplicateCount: 0,
                failedCount: 1,
                errors: [
                    err instanceof Error
                        ? err.message
                        : "UNKNOWN_ERROR",
                ],
            };
        }
    }
    /**
     * NORMALIZER RESOLVER
     */
    resolveNormalizer(source) {
        switch (source) {
            case "shopify":
                return shopify_normalizer_1.shopifyNormalizer;
            default:
                throw new Error(`NO_NORMALIZER_FOR_${source}`);
        }
    }
}
exports.ImportEngine = ImportEngine;
/**
 * SINGLETON EXPORT
 */
exports.importEngine = new ImportEngine();
