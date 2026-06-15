"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = exports.DefaultProductValidator = void 0;
/**
 * ==========================================================
 * PRODUCT VALIDATOR
 * ==========================================================
 * Responsibilities:
 * - Validate raw import payload
 * - Protect import pipeline
 * - Reject malformed products
 * - Remain source-agnostic
 * ==========================================================
 */
class DefaultProductValidator {
    validate(raw) {
        const errors = [];
        // --------------------------------------------------
        // Raw product existence
        // --------------------------------------------------
        if (!raw) {
            errors.push("RAW_PRODUCT_MISSING");
            return {
                valid: false,
                errors,
            };
        }
        // --------------------------------------------------
        // Source validation
        // --------------------------------------------------
        if (!raw.source) {
            errors.push("SOURCE_MISSING");
        }
        // --------------------------------------------------
        // Source product id validation
        // --------------------------------------------------
        if (!raw.sourceProductId ||
            raw.sourceProductId.trim().length === 0) {
            errors.push("SOURCE_PRODUCT_ID_MISSING");
        }
        // --------------------------------------------------
        // Payload validation
        // --------------------------------------------------
        if (raw.payload === null ||
            raw.payload === undefined) {
            errors.push("PAYLOAD_MISSING");
        }
        // --------------------------------------------------
        // Import timestamp validation
        // --------------------------------------------------
        if (!(raw.importedAt instanceof Date)) {
            errors.push("INVALID_IMPORT_TIMESTAMP");
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
exports.DefaultProductValidator = DefaultProductValidator;
/**
 * Singleton validator
 */
exports.productValidator = new DefaultProductValidator();
