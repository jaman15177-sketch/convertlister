/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Constants
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Immutable constants used by Canonical domain.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Identity thresholds
 * ✓ Version values
 * ✓ Default configuration
 * ✓ Matching limits
 *
 * MUST NOT contain:
 * ✗ Business logic
 * ✗ Database logic
 * ✗ Runtime state
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Immutable
 * ✓ Predictable
 * ✓ Repository ready
 * ✓ AI pipeline compatible
 * ============================================================
 */


/* ============================================================
 * CANONICAL VERSION
 * ============================================================
 */

export const CANONICAL_VERSION = "1.0.0";


/* ============================================================
 * IDENTITY SCORE
 * ============================================================
 */

export const IDENTITY_SCORE = Object.freeze({

  PERFECT: 100,

  HIGH: 90,

  MEDIUM: 70,

  LOW: 50,

  NONE: 0,

});


/* ============================================================
 * MATCH THRESHOLD
 * ============================================================
 */

export const MATCH_THRESHOLD = Object.freeze({

  EXACT: 95,

  STRONG: 80,

  POSSIBLE: 60,

  NONE: 0,

});


/* ============================================================
 * NORMALIZATION DEFAULTS
 * ============================================================
 */

export const NORMALIZATION_DEFAULTS =
  Object.freeze({

    EMPTY_VALUE: "",

    UNKNOWN_BRAND: "unknown",

    UNKNOWN_CATEGORY: "unknown",

  });


/* ============================================================
 * PRODUCT LIMITS
 * ============================================================
 */

export const CANONICAL_LIMITS =
  Object.freeze({

    MAX_TITLE_LENGTH: 500,

    MAX_DESCRIPTION_LENGTH: 10000,

    MAX_ATTRIBUTES: 200,

    MAX_VARIANTS: 1000,

  });


/* ============================================================
 * FINGERPRINT
 * ============================================================
 */

export const FINGERPRINT_SEPARATOR = "|";


/* ============================================================
 * DEFAULT ATTRIBUTE KEYS
 * ============================================================
 */

export const CANONICAL_ATTRIBUTE_KEYS =
  Object.freeze({

    BRAND: "brand",

    SKU: "sku",

    BARCODE: "barcode",

    CATEGORY: "category",

  });


/* ============================================================
 * EXPORT BUNDLE
 * ============================================================
 */

export const CANONICAL_CONSTANTS =
  Object.freeze({

    CANONICAL_VERSION,

    IDENTITY_SCORE,

    MATCH_THRESHOLD,

    NORMALIZATION_DEFAULTS,

    CANONICAL_LIMITS,

    FINGERPRINT_SEPARATOR,

    CANONICAL_ATTRIBUTE_KEYS,

  });
