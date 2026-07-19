/**
 * ==========================================================
 * WINNING COMPARATOR
 * ==========================================================
 *
 * Enterprise Winning Candidate Comparator
 *
 * Responsibilities:
 * - Compare winning candidates
 * - Determine stronger candidate
 * - Provide comparison result
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No scoring calculation
 * - No AI optimization
 * - Pure comparison logic
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * TYPES
 * ==========================================================
 */

export type WinningComparisonResult =
  | "FIRST_BETTER"
  | "SECOND_BETTER"
  | "EQUAL";



export interface WinningComparison {

  readonly result:
    WinningComparisonResult;

  readonly scoreDifference:
    number;

  readonly confidenceDifference:
    number;

}



/* ==========================================================
 * COMPARATOR ENGINE
 * ==========================================================
 */

export class WinningComparatorEngine {



  /**
   * Compare two candidates
   */

  static compare(
    first: WinningCandidate,
    second: WinningCandidate
  ): WinningComparison {


    const scoreDifference =
      first.score -
      second.score;


    const confidenceDifference =
      first.confidence -
      second.confidence;



    if (
      scoreDifference > 0
    ) {

      return {

        result:
          "FIRST_BETTER",

        scoreDifference,

        confidenceDifference,

      };

    }



    if (
      scoreDifference < 0
    ) {

      return {

        result:
          "SECOND_BETTER",

        scoreDifference,

        confidenceDifference,

      };

    }



    return {

      result:
        "EQUAL",

      scoreDifference,

      confidenceDifference,

    };

  }



  /**
   * Find strongest candidate
   */

  static best(
    candidates:
      readonly WinningCandidate[]
  ):
    WinningCandidate | undefined {


    if (
      candidates.length === 0
    ) {

      return undefined;

    }



    return candidates.reduce(
      (
        best,
        current
      ) => {


        const comparison =
          this.compare(
            current,
            best
          );


        return comparison.result ===
          "FIRST_BETTER"
          ? current
          : best;


      }
    );

  }



}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningComparator =
  WinningComparatorEngine;
