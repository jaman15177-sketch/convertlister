/**
 * ==========================================================
 * WINNING METRICS
 * ==========================================================
 *
 * Enterprise Winning Metrics Engine
 *
 * Responsibilities
 * - Calculate runtime metrics
 * - Aggregate winning statistics
 * - Provide immutable metrics
 *
 * Rules
 * - No scoring
 * - No ranking
 * - No rule execution
 * - No repository
 * - No persistence
 * - No AI
 * ==========================================================
 */

import type {
  WinningScoreResult,
} from "./winning.score";

/* ==========================================================
 * METRICS
 * ==========================================================
 */

export interface WinningMetrics {

  readonly processed: number;

  readonly winners: number;

  readonly rejected: number;

  readonly averageScore: number;

  readonly highestScore: number;

  readonly lowestScore: number;

  readonly winnerRate: number;

}

/* ==========================================================
 * METRICS ENGINE
 * ==========================================================
 */

export class WinningMetricsEngine {

  private constructor() {}

  static calculate(
    results:
      readonly WinningScoreResult[]
  ): WinningMetrics {

    const processed =
      results.length;

    const winners =
      results.filter(
        (result) =>
          result.winner
      ).length;

    const rejected =
      processed - winners;

    const scores =
      results.map(
        (result) =>
          result.score
      );

    const totalScore =
      scores.reduce(
        (
          total,
          score
        ) =>
          total + score,
        0
      );

    return {

      processed,

      winners,

      rejected,

      averageScore:
        processed === 0
          ? 0
          : totalScore /
            processed,

      highestScore:
        processed === 0
          ? 0
          : Math.max(
              ...scores
            ),

      lowestScore:
        processed === 0
          ? 0
          : Math.min(
              ...scores
            ),

      winnerRate:
        processed === 0
          ? 0
          : (winners /
              processed) *
            100,

    };

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningMetrics =
  WinningMetricsEngine;
