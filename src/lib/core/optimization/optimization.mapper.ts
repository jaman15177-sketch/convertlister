/**
 * ==========================================================
 * AI OPTIMIZATION MAPPER
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Map OptimizationResult to OptimizationOutput
 * - Normalize engine output
 * - Keep output immutable
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

import type {
  OptimizationOutput,
} from "./optimization.output";


/* ==========================================================
 * MAPPER
 * ==========================================================
 */

export class OptimizationMapper {

  private constructor() {}

  static toOutput(
    result: OptimizationResult,
    provider: string,
    processingTimeMs: number,
  ): OptimizationOutput {

    return {

      id:
        result.id,

      productId:
        result.productId,

      content:
        result.content,

      provider,

      status:
        result.status === "COMPLETED"
          ? "SUCCESS"
          : "FAILED",

      processingTimeMs,

      generatedAt:
        result.createdAt,

    };

  }

}


/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const optimizationMapper =
  OptimizationMapper;
