/**
 * ==========================================================
 * WINNING FILTER
 * ==========================================================
 *
 * Enterprise Winning Candidate Filter
 *
 * Responsibilities:
 * - Remove invalid candidates
 * - Apply detection quality filters
 * - Keep only usable winners
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No scoring
 * - No AI optimization
 * - Pure filtering logic
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * FILTER RESULT
 * ==========================================================
 */

export interface WinningFilterResult {

  readonly accepted:
    readonly WinningCandidate[];

  readonly rejected:
    readonly WinningCandidate[];

}



/* ==========================================================
 * FILTER ENGINE
 * ==========================================================
 */

export class WinningFilterEngine {



  /**
   * Filter candidates
   */

  static filter(
    candidates:
      readonly WinningCandidate[]
  ): WinningFilterResult {


    const accepted:
      WinningCandidate[] = [];


    const rejected:
      WinningCandidate[] = [];



    for (
      const candidate
      of candidates
    ) {


      if (
        this.isValid(
          candidate
        )
      ) {

        accepted.push(
          candidate
        );

      } else {

        rejected.push(
          candidate
        );

      }

    }



    return {

      accepted,

      rejected,

    };

  }



  /**
   * Candidate validation rules
   */

  private static isValid(
    candidate: WinningCandidate
  ): boolean {


    if (
      !candidate.id
    ) {

      return false;

    }


    if (
      candidate.score < 40
    ) {

      return false;

    }


    if (
      candidate.product === undefined
    ) {

      return false;

    }


    return true;

  }



  /**
   * Only winners
   */

  static winnersOnly(
    candidates:
      readonly WinningCandidate[]
  ): readonly WinningCandidate[] {


    return this.filter(
      candidates
    )
    .accepted
    .filter(
      candidate =>
        candidate.passed
    );

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningFilter =
  WinningFilterEngine;
