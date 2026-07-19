/**
 * ==========================================================
 * WINNING CONSTANTS
 * ==========================================================
 *
 * Enterprise Winning Detection Constants
 *
 * Responsibilities
 * - Shared constants
 * - Default thresholds
 * - Score limits
 * - Engine defaults
 *
 * Rules
 * - Constants only
 * - No logic
 * - No business implementation
 * ==========================================================
 */

/* ==========================================================
 * SCORE RANGE
 * ==========================================================
 */

export const WINNING_MIN_SCORE = 0;

export const WINNING_MAX_SCORE = 100;

/* ==========================================================
 * SCORE THRESHOLDS
 * ==========================================================
 */

export const WINNING_LOW_THRESHOLD = 25;

export const WINNING_MEDIUM_THRESHOLD = 50;

export const WINNING_HIGH_THRESHOLD = 75;

export const WINNING_WINNER_THRESHOLD = 90;

/* ==========================================================
 * DEFAULT WEIGHTS
 * ==========================================================
 */

export const DEFAULT_PRICE_WEIGHT = 20;

export const DEFAULT_TITLE_WEIGHT = 15;

export const DEFAULT_DESCRIPTION_WEIGHT = 15;

export const DEFAULT_IMAGE_WEIGHT = 10;

export const DEFAULT_ATTRIBUTE_WEIGHT = 10;

export const DEFAULT_KEYWORD_WEIGHT = 10;

export const DEFAULT_MARKETPLACE_WEIGHT = 10;

export const DEFAULT_SOURCE_WEIGHT = 5;

export const DEFAULT_VARIANT_WEIGHT = 5;

/* ==========================================================
 * ENGINE DEFAULTS
 * ==========================================================
 */

export const DEFAULT_BATCH_SIZE = 100;

export const DEFAULT_MINIMUM_SCORE =
  WINNING_MEDIUM_THRESHOLD;
export const DEFAULT_WINNING_THRESHOLD =
  DEFAULT_MINIMUM_SCORE;
/* ==========================================================
 * CACHE
 * ==========================================================
 */

export const WINNING_CACHE_PREFIX =
  "winning";

/* ==========================================================
 * VERSION
 * ==========================================================
 */

export const WINNING_ENGINE_VERSION =
  "1.0.0";
