/**
 * ==========================================================
 * WINNING FILTER
 * ==========================================================
 *
 * Enterprise Winning Candidate Filter
 *
 * Responsibilities:
 * - Remove low-quality candidates
 * - Apply minimum score validation
 * - Keep only winning-ready candidates
 *
 * Rules:
 * - No scoring
 * - No ranking
 * - No AI optimization
 * - No repository
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

    for (const candidate of candidates) {

      if (
        this.isValid(candidate)
      ) {

        accepted.push(candidate);

      } else {

        rejected.push(candidate);

      }

    }

    return {

      accepted,

      rejected,

    };

  }

  /**
   * Validation
   */

  private static isValid(
    candidate: WinningCandidate
  ): boolean {

    if (!candidate.product) {
      return false;
    }

    if (
      candidate.score < 40
    ) {
      return false;
    }

    return true;

  }

  /**
   * Winners only
   */

  static winnersOnly(
    candidates:
      readonly WinningCandidate[]
  ): readonly WinningCandidate[] {

    return this.filter(
      candidates
    ).accepted.filter(
      (candidate) =>
        candidate.winner
    );

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningFilter =
  WinningFilterEngine;
