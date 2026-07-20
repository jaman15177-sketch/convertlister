/**
 * ==========================================================
 * AI OPTIMIZATION CONSTANTS
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - System-wide immutable constants
 * - AI optimization defaults
 * - Engine configuration values
 *
 * Rules:
 * - Constants only
 * - No business logic
 * - No AI execution
 * - No quality rules
 * - No approval rules
 * ==========================================================
 */


/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export const OPTIMIZATION_ENGINE_NAME =
  "AIOptimizationEngine";

export const OPTIMIZATION_ENGINE_VERSION =
  "1.0.0";


/* ==========================================================
 * BATCH
 * ==========================================================
 */

export const DEFAULT_BATCH_SIZE =
  100;

export const MAX_BATCH_SIZE =
  1000;


/* ==========================================================
 * CONTENT
 * ==========================================================
 */

export const MAX_TITLE_LENGTH =
  200;

export const MAX_DESCRIPTION_LENGTH =
  5000;

export const MAX_BULLET_POINTS =
  10;

export const MAX_KEYWORDS =
  50;


/* ==========================================================
 * AI
 * ==========================================================
 */

export const DEFAULT_LANGUAGE =
  "en";

export const DEFAULT_MARKETPLACE =
  "generic";

export const DEFAULT_AI_PROVIDER =
  "openai";


/* ==========================================================
 * RETRY
 * ==========================================================
 */

export const MAX_AI_RETRY =
  3;


/* ==========================================================
 * STATUS
 * ==========================================================
 */

export const OPTIMIZATION_STATUS = {

  PENDING:
    "PENDING",

  PROCESSING:
    "PROCESSING",

  COMPLETED:
    "COMPLETED",

  FAILED:
    "FAILED",

} as const;
