/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE QUALITY SCORER
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Calculate the overall quality score.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Aggregate validator scores
 * • Calculate weighted score
 * • Determine quality level
 * • Produce quality summary
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validators
 * ✗ Generate reports
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

import type {
  QualityScorerContract,
} from "./quality.contract";

import type {
  QualityReport,
  QualitySummary,
  QualityValidatorResult,
} from "./quality.types";

import {
  emptyQualityMetrics,
  qualityMetricWeights,
} from "./quality.metrics";

import {
  QUALITY_DEFAULTS,
  QUALITY_THRESHOLD,
} from "./quality.constants";

export class QualityScorer
  implements QualityScorerContract {

  score(
    validators:
      readonly QualityValidatorResult[],
  ): QualityReport {

    const metrics = {
      ...emptyQualityMetrics,
    };

    let weightedScore = 0;

    for (
      const validator of validators
    ) {

      const key =
        validator.validator as keyof typeof metrics;

      if (
        key in metrics
      ) {

        metrics[key] =
          validator.score;

      }

      const weight =
        qualityMetricWeights[key] ?? 0;

      weightedScore +=
        validator.score *
        (weight / 100);

    }

    const summary:
      QualitySummary = {

      score:
        Math.round(
          weightedScore,
        ),

      level:
        this.level(
          weightedScore,
        ),

      passed:
        weightedScore >=
        QUALITY_DEFAULTS.PASSING_SCORE,

    };

    return {

      validators,

      metrics,

      summary,

    };

  }

  private level(
    score: number,
  ) {

    if (
      score >=
      QUALITY_THRESHOLD.EXCELLENT
    ) {

      return "EXCELLENT";

    }

    if (
      score >=
      QUALITY_THRESHOLD.VERY_GOOD
    ) {

      return "VERY_GOOD";

    }

    if (
      score >=
      QUALITY_THRESHOLD.GOOD
    ) {

      return "GOOD";

    }

    if (
      score >=
      QUALITY_THRESHOLD.NEEDS_IMPROVEMENT
    ) {

      return "NEEDS_IMPROVEMENT";

    }

    return "POOR";

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualityScorer =
  QualityScorer;
