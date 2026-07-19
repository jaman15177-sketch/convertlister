/**
 * ==========================================================
 * WINNING RANKING
 * ==========================================================
 *
 * Enterprise Winning Ranking Engine
 *
 * Responsibilities:
 * - Rank winning candidates
 * - Sort by score/confidence
 * - Assign position
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No detector dependency
 * - Pure ranking logic
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * RANKED CANDIDATE
 * ==========================================================
 */

export interface RankedWinningCandidate
  extends WinningCandidate {

  readonly rank: number;

}



/* ==========================================================
 * RANKING ENGINE
 * ==========================================================
 */

export class WinningRankingEngine {



  /**
   * Rank candidates
   */

  static rank(
    candidates:
      readonly WinningCandidate[]
  ): readonly RankedWinningCandidate[] {


    return [
      ...candidates,
    ]
      .sort(
        (
          first,
          second
        ) =>

          second.score -
          first.score

      )
      .map(
        (
          candidate,
          index
        ) => ({

          ...candidate,

          rank:
            index + 1,

        })
      );

  }



  /**
   * Get top winners
   */

  static top(
    candidates:
      readonly WinningCandidate[],
    limit = 10
  ): readonly RankedWinningCandidate[] {


    return this.rank(
      candidates
    )
    .slice(
      0,
      limit
    );

  }



  /**
   * Find first winner
   */

  static best(
    candidates:
      readonly WinningCandidate[]
  ): RankedWinningCandidate | undefined {


    return this.rank(
      candidates
    )[0];

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningRanking =
  WinningRankingEngine;
