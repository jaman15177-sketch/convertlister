/**
 * ==========================================================
 * WINNING CONFIDENCE
 * ==========================================================
 *
 * Helper Utility
 *
 * Responsibilities
 * - Convert winning score into confidence
 * - Normalize confidence value
 *
 * Rules
 * - No business logic
 * - No detector
 * - No ranking
 * - No signal
 * - No AI
 * ==========================================================
 */

/* ==========================================================
 * TYPES
 * ==========================================================
 */

export interface WinningConfidenceResult {

  readonly confidence: number;

}

/* ==========================================================
 * HELPER
 * ==========================================================
 */

export class WinningConfidenceHelper {

  private constructor() {}

  static calculate(
    score: number
  ): WinningConfidenceResult {

    const normalized =
      Math.max(
        0,
        Math.min(
          100,
          score
        )
      );

    return {

      confidence:
        normalized / 100,

    };

  }

}

/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const winningConfidence =
  WinningConfidenceHelper;
