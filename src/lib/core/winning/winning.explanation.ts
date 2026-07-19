/**
 * ==========================================================
 * WINNING EXPLANATION
 * ==========================================================
 *
 * Helper Utility
 *
 * Responsibilities
 * - Build human-readable explanation
 * - Format winning reasons
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

export interface WinningExplanation {

  readonly summary: string;

  readonly factors:
    readonly string[];

  readonly strengths:
    readonly string[];

  readonly weaknesses:
    readonly string[];

}

/* ==========================================================
 * HELPER
 * ==========================================================
 */

export class WinningExplanationHelper {

  private constructor() {}

  static create(
    score: number,
    reasons: readonly string[]
  ): WinningExplanation {

    let summary = "Low winning potential";

    if (score >= 90) {

      summary =
        "Excellent winning potential";

    } else if (score >= 70) {

      summary =
        "Strong winning potential";

    } else if (score >= 40) {

      summary =
        "Moderate winning potential";

    }

    return {

  summary,

  factors:
    [...reasons],

  strengths:
    [...reasons],

  weaknesses:
    [],

};

  }

}

/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const winningExplanation =
  WinningExplanationHelper;
