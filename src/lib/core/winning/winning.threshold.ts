/**
 * ==========================================================
 * WINNING THRESHOLD
 * ==========================================================
 *
 * Enterprise Winning Threshold Engine
 *
 * Responsibilities:
 * - Manage winning score thresholds
 * - Decide qualification level
 * - Keep threshold rules centralized
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No detector dependency
 * - Pure decision logic
 * ==========================================================
 */


/* ==========================================================
 * TYPES
 * ==========================================================
 */

export type WinningThresholdLevel =
  | "REJECT"
  | "CANDIDATE"
  | "HIGH_POTENTIAL"
  | "WINNER";



export interface WinningThresholdResult {

  readonly qualified: boolean;

  readonly level:
    WinningThresholdLevel;

}



/* ==========================================================
 * CONFIGURATION
 * ==========================================================
 */

export const WINNING_THRESHOLDS = {

  CANDIDATE: 40,

  HIGH_POTENTIAL: 70,

  WINNER: 90,

} as const;



/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class WinningThresholdEngine {


  /**
   * Resolve score level
   */

  static evaluate(
    score: number
  ): WinningThresholdResult {


    const normalized =
      Math.max(
        0,
        Math.min(
          100,
          score
        )
      );


    if (
      normalized >=
      WINNING_THRESHOLDS.WINNER
    ) {

      return {
  qualified: true,
  level: "WINNER",
};

    }



    if (
      normalized >=
      WINNING_THRESHOLDS.HIGH_POTENTIAL
    ) {

      return {
  qualified: true,
  level: "HIGH_POTENTIAL",
};

    }



    if (
      normalized >=
      WINNING_THRESHOLDS.CANDIDATE
    ) {

      return {
  qualified: false,
  level: "CANDIDATE",
};

    }



    return {
  qualified: false,
  level: "REJECT",
};

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningThreshold =
  WinningThresholdEngine;
