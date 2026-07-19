/**
 * ==========================================================
 * WINNING EXPLANATION
 * ==========================================================
 *
 * Enterprise Winning Explanation Engine
 *
 * Responsibilities:
 * - Explain why product wins
 * - Convert rule reasons into readable output
 * - Provide transparent decision support
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No scoring logic
 * - Explanation only
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
 * EXPLANATION ENGINE
 * ==========================================================
 */

export class WinningExplanationEngine {



  /**
   * Create explanation
   */

  static generate(
    reasons:
      readonly string[]
  ): WinningExplanation {


    const factors =
      [...reasons];


    return {

      summary:
        this.createSummary(
          factors
        ),

      factors,

      strengths:
        factors,

      weaknesses:
        factors.length === 0
          ? [
              "No winning signals detected"
            ]
          : [],

    };

  }



  /**
   * Summary generator
   */

  private static createSummary(
    factors:
      readonly string[]
  ): string {


    if (
      factors.length === 0
    ) {

      return (
        "Product has insufficient winning signals."
      );

    }


    return (
      `Product shows ${factors.length} `
      +
      "positive winning signals."
    );

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningExplanation =
  WinningExplanationEngine;
