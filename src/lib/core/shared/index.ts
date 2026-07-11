/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Public API
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Single public entry point for the Shared module.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Export shared contracts
 * ✓ Export shared constants
 * ✓ Export shared errors
 * ✓ Export shared results
 * ✓ Export shared identity helpers
 * ✓ Export shared utilities
 * ✓ Export shared validators
 *
 * MUST NOT contain
 * ------------------------------------------------------------
 * ✗ Business logic
 * ✗ Runtime logic
 * ✗ Side effects
 * ✗ Domain logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Single import point
 * ✓ Tree-shakable
 * ✓ Build-safe
 * ✓ Enterprise scalable
 * ============================================================
 */

export * from "./shared.types";

export * from "./shared.constants";

export * from "./shared.errors";

export * from "./shared.result";

export * from "./shared.id";

export * from "./shared.utils";

export * from "./shared.validator";
