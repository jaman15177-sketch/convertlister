/**
 * ==========================================================
 * AI OPTIMIZATION VERSION
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Track optimization version
 * - AI model version
 * - Prompt version
 * - Engine version
 *
 * Rules
 * - No AI execution
 * - No quality validation
 * - No approval logic
 * - Immutable metadata only
 * ==========================================================
 */


/* ==========================================================
 * VERSION
 * ==========================================================
 */

export interface OptimizationVersion {

  /**
   * Engine version
   */
  readonly engineVersion:
    string;

  /**
   * Prompt version
   */
  readonly promptVersion:
    string;

  /**
   * AI model
   */
  readonly model:
    string;

  /**
   * Provider
   */
  readonly provider:
    string;

  /**
   * Generated time
   */
  readonly generatedAt:
    Date;

}


/* ==========================================================
 * DEFAULT VERSION
 * ==========================================================
 */

export const DEFAULT_OPTIMIZATION_VERSION:
  OptimizationVersion = {

  engineVersion:
    "1.0.0",

  promptVersion:
    "1.0.0",

  model:
    "unknown",

  provider:
    "unknown",

  generatedAt:
    new Date(),

};
