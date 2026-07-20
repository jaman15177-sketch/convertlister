/**
 * ==========================================================
 * AI OPTIMIZATION REPORT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Optimization summary
 * - Execution statistics
 * - Operational reporting
 *
 * Rules
 * - No AI execution
 * - No quality validation
 * - No approval logic
 * - No persistence
 * ==========================================================
 */

import type {
  OptimizationResult,
} from "./optimization.types";


/* ==========================================================
 * REPORT
 * ==========================================================
 */

export interface OptimizationReport {

  readonly totalRequests:
    number;

  readonly successful:
    number;

  readonly failed:
    number;

  readonly successRate:
    number;

  readonly generatedAt:
    Date;

  readonly results:
    readonly OptimizationResult[];

}


/* ==========================================================
 * REPORT ENGINE
 * ==========================================================
 */

export class OptimizationReportEngine {

  private constructor() {}

  static generate(
    results:
      readonly OptimizationResult[]
  ): OptimizationReport {

    const successful =
      results.filter(
        result =>
          result.status === "COMPLETED"
      ).length;

    const failed =
      results.length - successful;

    return {

      totalRequests:
        results.length,

      successful,

      failed,

      successRate:

        results.length === 0
          ? 0
          : Number(
              (
                (successful / results.length) *
                100
              ).toFixed(2)
            ),

      generatedAt:
        new Date(),

      results:
        [...results],

    };

  }

}


/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const optimizationReport =
  OptimizationReportEngine;
