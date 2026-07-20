/**
 * ==========================================================
 * AI OPTIMIZATION OUTPUT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Standard optimization output
 * - Immutable output model
 * - AI engine boundary
 *
 * Rules
 * - No AI execution
 * - No quality scoring
 * - No approval decision
 * - No persistence
 * ==========================================================
 */

import type {
  OptimizedContent,
} from "./optimization.types";


/* ==========================================================
 * OUTPUT STATUS
 * ==========================================================
 */

export type OptimizationOutputStatus =

  | "SUCCESS"

  | "FAILED";


/* ==========================================================
 * OUTPUT
 * ==========================================================
 */

export interface OptimizationOutput {

  /**
   * Optimization ID
   */
  readonly id:
    string;

  /**
   * Product ID
   */
  readonly productId:
    string;

  /**
   * AI Optimized Content
   */
  readonly content:
    OptimizedContent;

  /**
   * AI Provider Name
   */
  readonly provider:
    string;

  /**
   * Execution Status
   */
  readonly status:
    OptimizationOutputStatus;

  /**
   * AI Processing Time
   */
  readonly processingTimeMs:
    number;

  /**
   * Generated Timestamp
   */
  readonly generatedAt:
    Date;

}
