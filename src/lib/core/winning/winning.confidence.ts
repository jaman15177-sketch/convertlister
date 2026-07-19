/**
 * ==========================================================
 * WINNING CONFIDENCE
 * ==========================================================
 *
 * Enterprise Winning Confidence Engine
 *
 * Responsibilities:
 * - Convert score into confidence
 * - Normalize confidence value
 * - Provide confidence classification
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No detector dependency
 * - Pure calculation only
 * ==========================================================
 */


/* ==========================================================
 * CONFIDENCE TYPES
 * ==========================================================
 */

export type WinningConfidenceLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH";


export interface WinningConfidenceResult {

  readonly confidence: number;

  readonly level:
    WinningConfidenceLevel;

}



/* ==========================================================
 * CONFIDENCE ENGINE
 * ==========================================================
 */

export class WinningConfidenceEngine {



  /**
   * Calculate confidence from score
   *
   * Score range:
   * 0 - 100
   *
   * Confidence:
   * 0.0 - 1.0
   */

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


    const confidence =
      Number(
        (
          normalized / 100
        ).toFixed(2)
      );


    return {

      confidence,

      level:
        this.resolveLevel(
          confidence
        ),

    };

  }



  /**
   * Resolve confidence level
   */

  private static resolveLevel(
    confidence: number
  ): WinningConfidenceLevel {


    if (confidence >= 0.9) {

      return "VERY_HIGH";

    }


    if (confidence >= 0.75) {

      return "HIGH";

    }


    if (confidence >= 0.5) {

      return "MEDIUM";

    }


    return "LOW";

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningConfidence =
  WinningConfidenceEngine;
