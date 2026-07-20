/**
 * ==========================================================
 * AI OPTIMIZATION SNAPSHOT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Immutable optimization snapshot
 * - Audit history
 * - Rollback support
 *
 * Rules
 * - No AI execution
 * - No quality validation
 * - No approval logic
 * - No persistence
 * ==========================================================
 */

import type {
  OptimizedContent,
} from "./optimization.types";

import type {
  OptimizationVersion,
} from "./optimization.version";


/* ==========================================================
 * SNAPSHOT
 * ==========================================================
 */

export interface OptimizationSnapshot {

  /**
   * Snapshot ID
   */
  readonly id:
    string;

  /**
   * Product ID
   */
  readonly productId:
    string;

  /**
   * Original content
   */
  readonly original:
    OptimizedContent;

  /**
   * AI optimized content
   */
  readonly optimized:
    OptimizedContent;

  /**
   * Version metadata
   */
  readonly version:
    OptimizationVersion;

  /**
   * Snapshot creation time
   */
  readonly createdAt:
    Date;

}
