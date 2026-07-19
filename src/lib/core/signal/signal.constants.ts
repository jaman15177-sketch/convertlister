/**
 * ==========================================================
 * SIGNAL CONSTANTS
 * ==========================================================
 *
 * Enterprise Signal Constants
 *
 * Responsibilities:
 * - Signal threshold definition
 * - Decision boundary values
 *
 * Rules:
 * - No business logic
 * - No calculation
 * - No mutation
 * ==========================================================
 */


/* ==========================================================
 * SIGNAL SCORE RANGE
 * ==========================================================
 */

export const SIGNAL_SCORE = {

  MIN: 0,

  MAX: 100,

} as const;



/* ==========================================================
 * SIGNAL THRESHOLD
 * ==========================================================
 *
 * Green  : AI optimization allowed
 * Yellow : Review required
 * Red    : Block optimization
 *
 * ==========================================================
 */

export const SIGNAL_THRESHOLD = {

  GREEN_MIN: 85,

  YELLOW_MIN: 60,

  RED_MAX: 59,

} as const;



/* ==========================================================
 * METRIC DEFAULTS
 * ==========================================================
 */

export const SIGNAL_DEFAULTS = {

  SCORE: 0,

  RISK: "HIGH",

  AI_READY: "NO",

} as const;



/* ==========================================================
 * METRIC WEIGHT
 * ==========================================================
 *
 * Future AI scoring support
 *
 * ==========================================================
 */

export const SIGNAL_WEIGHT = {

  TREND: 0.15,

  MARGIN: 0.15,

  WINNING: 0.20,

  SEO: 0.10,

  PRICE: 0.10,

  GROWTH: 0.15,

  RISK: 0.15,

} as const;
