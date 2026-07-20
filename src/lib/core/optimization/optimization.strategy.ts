/**
 * ==========================================================
 * AI OPTIMIZATION STRATEGY
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Define optimization strategy
 * - Decide optimization scope
 * - Build optimization plan
 *
 * Rules:
 * - No AI execution
 * - No prompt generation
 * - No quality validation
 * - No approval logic
 * ==========================================================
 */

import type {
  OptimizationType,
} from "./optimization.types";


/* ==========================================================
 * STRATEGY MODE
 * ==========================================================
 */

export type OptimizationStrategyMode =

  | "MINIMAL"

  | "STANDARD"

  | "AGGRESSIVE"

  | "MAXIMUM";


/* ==========================================================
 * OPTIMIZATION STRATEGY
 * ==========================================================
 */

export interface OptimizationStrategy {

  /**
   * Strategy name
   */
  readonly name:
    string;

  /**
   * Optimization mode
   */
  readonly mode:
    OptimizationStrategyMode;

  /**
   * Enabled optimization types
   */
  readonly optimizationTypes:
    readonly OptimizationType[];

  /**
   * Preserve original facts
   */
  readonly preserveFacts:
    boolean;

  /**
   * Preserve brand identity
   */
  readonly preserveBrand:
    boolean;

  /**
   * Marketplace compliant
   */
  readonly marketplaceSafe:
    boolean;

  /**
   * SEO optimization enabled
   */
  readonly seoEnabled:
    boolean;

  /**
   * Conversion optimization enabled
   */
  readonly conversionEnabled:
    boolean;

}


/* ==========================================================
 * DEFAULT STRATEGY
 * ==========================================================
 */

export const DEFAULT_OPTIMIZATION_STRATEGY:
  OptimizationStrategy = {

  name:
    "Maximum Conversion",

  mode:
    "MAXIMUM",

  optimizationTypes: [

    "TITLE",

    "DESCRIPTION",

    "BULLET_POINTS",

    "SEO",

    "KEYWORDS",

    "ATTRIBUTES",

  ],

  preserveFacts:
    true,

  preserveBrand:
    true,

  marketplaceSafe:
    true,

  seoEnabled:
    true,

  conversionEnabled:
    true,

};
