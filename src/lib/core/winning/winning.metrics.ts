/**
 * ==========================================================
 * WINNING METRICS
 * ==========================================================
 *
 * Enterprise Winning Metrics Engine
 *
 * Responsibilities
 * - Batch analytics
 * - Score statistics
 * - Confidence statistics
 * - Level distribution
 * - Runtime metrics
 * ==========================================================
 */

import type {
  WinningCandidate,
  WinningLevel,
} from "./winning.types";

/* ==========================================================
 * METRICS
 * ==========================================================
 */

export interface WinningMetrics {

  readonly processed: number;

  readonly winners: number;

  readonly rejected: number;

  readonly passRate: number;

  readonly averageScore: number;

  readonly averageConfidence: number;

  readonly highestScore: number;

  readonly lowestScore: number;

  readonly levelDistribution:
    Readonly<
      Record<
        WinningLevel,
        number
      >
    >;

  readonly startedAt: Date;

  readonly finishedAt: Date;

  readonly durationMs: number;

}

/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class WinningMetricsEngine {

  private startedAt =
    new Date();

  start(): void {

    this.startedAt =
      new Date();

  }

  finish(
    candidates:
      readonly WinningCandidate[]
  ): WinningMetrics {

    const finishedAt =
      new Date();

    const processed =
      candidates.length;

    const winners =
      candidates.filter(
        candidate =>
          candidate.passed
      ).length;

    const rejected =
      processed - winners;

    const totalScore =
      candidates.reduce(
        (
          sum,
          candidate
        ) =>
          sum +
          candidate.score,
        0
      );

    const totalConfidence =
      candidates.reduce(
        (
          sum,
          candidate
        ) =>
          sum +
          candidate.confidence,
        0
      );

    const scores =
      candidates.map(
        candidate =>
          candidate.score
      );

    const levelDistribution = {

      LOW: 0,

      MEDIUM: 0,

      HIGH: 0,

      WINNER: 0,

    };

    for (
      const candidate
      of candidates
    ) {

      levelDistribution[
        candidate.level
      ]++;

    }

    return {

      processed,

      winners,

      rejected,

      passRate:
        processed === 0
          ? 0
          : winners /
            processed,

      averageScore:
        processed === 0
          ? 0
          : totalScore /
            processed,

      averageConfidence:
        processed === 0
          ? 0
          : totalConfidence /
            processed,

      highestScore:
        scores.length === 0
          ? 0
          : Math.max(
              ...scores
            ),

      lowestScore:
        scores.length === 0
          ? 0
          : Math.min(
              ...scores
            ),

      levelDistribution,

      startedAt:
        this.startedAt,

      finishedAt,

      durationMs:
        finishedAt.getTime() -
        this.startedAt.getTime(),

    };

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningMetrics =
  new WinningMetricsEngine();
