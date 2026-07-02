/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Health Constants
 * ============================================================
 *
 * Foundation constants shared across the entire
 * Catalog Health Framework.
 *
 * Used by:
 * ------------------------------------------------------------
 * ✓ BaseValidator
 * ✓ ScoreEngine
 * ✓ IssueEngine
 * ✓ TelemetryEngine
 * ✓ MetadataEngine
 * ✓ AggregationEngine
 * ✓ All Validators
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Immutable
 * ✓ Build-safe
 * ✓ Zero business logic
 * ✓ Enterprise scalable
 * ============================================================
 */

/**
 * ============================================================
 * FRAMEWORK
 * ============================================================
 */

export const FRAMEWORK_NAME =
  "Catalog Health Framework" as const;

export const FRAMEWORK_VERSION =
  "1.0.0" as const;

/**
 * ============================================================
 * SCORE
 * ============================================================
 */

export const MAX_HEALTH_SCORE = 100;

export const MIN_HEALTH_SCORE = 0;

export const DEFAULT_HEALTH_SCORE = 100;

/**
 * ============================================================
 * VALIDATOR
 * ============================================================
 */

export const DEFAULT_VALIDATOR_VERSION =
  "1.0.0" as const;

export const DEFAULT_MARKETPLACE =
  "generic" as const;

/**
 * ============================================================
 * TELEMETRY
 * ============================================================
 */

export const DEFAULT_RULE_COUNT = 0;

export const DEFAULT_VALIDATOR_COUNT = 1;

/**
 * ============================================================
 * METADATA
 * ============================================================
 */

export const DEFAULT_ENGINE_NAME =
  "Catalog Health Framework" as const;

/**
 * ============================================================
 * EXPORT GROUPS
 * ============================================================
 */

export const SCORE_LIMITS = Object.freeze({
  MIN: MIN_HEALTH_SCORE,
  MAX: MAX_HEALTH_SCORE,
  DEFAULT: DEFAULT_HEALTH_SCORE,
});

export const FRAMEWORK = Object.freeze({
  NAME: FRAMEWORK_NAME,
  VERSION: FRAMEWORK_VERSION,
});

export const DEFAULTS = Object.freeze({
  VALIDATOR_VERSION: DEFAULT_VALIDATOR_VERSION,
  MARKETPLACE: DEFAULT_MARKETPLACE,
  RULE_COUNT: DEFAULT_RULE_COUNT,
  VALIDATOR_COUNT: DEFAULT_VALIDATOR_COUNT,
  ENGINE_NAME: DEFAULT_ENGINE_NAME,
});
/**
 * ============================================================
 * HEALTH STATUS THRESHOLDS
 * ------------------------------------------------------------
 * Used by:
 * • CatalogHealthEngine
 * ============================================================
 */
export const HEALTH_STATUS_THRESHOLD = Object.freeze({
  EXCELLENT: 90,
  GOOD: 75,
  WARNING: 50,
});
