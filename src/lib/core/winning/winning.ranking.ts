/**
 * ==========================================================
 * WINNING RANKING
 * ==========================================================
 *
 * Enterprise Winning Ranking Engine
 *
 * Responsibilities
 * - Rank winning results
 * - Sort by score
 * - Assign rank
 * - Return immutable ranking
 *
 * Rules
 * - No scoring
 * - No rule execution
 * - No metrics
 * - No repository
 * - No persistence
 * ==========================================================
 */

import type {
  WinningScoreResult,
} from "./winning.score";

/* ==========================================================
 * RANKED RESULT
 * ==========================================================
 */

export interface RankedWinningResult
  extends WinningScoreResult {

  readonly rank: number;

}

/* ==========================================================
 * RANKING ENGINE
 * ==========================================================
 */

export class WinningRankingEngine {

  private constructor() {}

  /**
   * Rank all results
   */

  static rank(
    results:
      readonly WinningScoreResult[]
  ): readonly RankedWinningResult[] {

    return [

      ...results,

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
          result,
          index
        ) => ({

          ...result,

          rank:
            index + 1,

        })
      );

  }

  /**
   * Top N winners
   */

  static top(
    results:
      readonly WinningScoreResult[],
    limit = 10
  ): readonly RankedWinningResult[] {

    return this
      .rank(
        results
      )
      .slice(
        0,
        limit
      );

  }

  /**
   * Best winner
   */

  static best(
    results:
      readonly WinningScoreResult[]
  ): RankedWinningResult | undefined {

    return this
      .rank(
        results
      )[0];

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningRanking =
  WinningRankingEngine;
