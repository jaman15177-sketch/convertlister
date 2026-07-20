/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE CONSTANTS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared constants for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Quality score thresholds
 * • Default engine values
 * • Validator identifiers
 * • Metric names
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute business logic
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ============================================================
 */

/* ============================================================
 * SCORE LIMITS
 * ============================================================
 */

export const QUALITY_SCORE = {

  MIN: 0,

  MAX: 100,

} as const;

/* ============================================================
 * QUALITY LEVEL THRESHOLDS
 * ============================================================
 */

export const QUALITY_THRESHOLD = {

  EXCELLENT: 95,

  VERY_GOOD: 90,

  GOOD: 80,

  NEEDS_IMPROVEMENT: 70,

} as const;

/* ============================================================
 * VALIDATOR NAMES
 * ============================================================
 */

export const QUALITY_VALIDATORS = {

  CONTENT: "content",

  SEO: "seo",

  CONVERSION: "conversion",

  GRAMMAR: "grammar",

  READABILITY: "readability",

  CONSISTENCY: "consistency",

  COMPLETENESS: "completeness",

} as const;

/* ============================================================
 * METRIC KEYS
 * ============================================================
 */

export const QUALITY_METRICS = {

  CONTENT: "content",

  SEO: "seo",

  CONVERSION: "conversion",

  GRAMMAR: "grammar",

  READABILITY: "readability",

  CONSISTENCY: "consistency",

  COMPLETENESS: "completeness",

  OVERALL: "overall",

} as const;

/* ============================================================
 * ENGINE DEFAULTS
 * ============================================================
 */

export const QUALITY_DEFAULTS = {

  VERSION: 1,

  INITIAL_SCORE: 0,

  PASSING_SCORE: 80,

} as const;
