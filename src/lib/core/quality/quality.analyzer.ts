/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE QUALITY ANALYZER
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Analyze validator results and produce a complete
 * quality report.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Execute quality validators
 * • Calculate quality score
 * • Produce quality report
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval logic
 * ✗ Persist data
 * ✗ Call AI
 * ✗ Publish marketplace
 * ============================================================
 */

import type {
  QualityAnalyzerContract,
} from "./quality.contract";

import type {
  QualityInput,
} from "./quality.input";

import type {
  QualityReport,
} from "./quality.types";

import {
  QualityValidators,
} from "./quality.validators";

import {
  QualityScorer,
} from "./quality.scorer";

export class QualityAnalyzer
  implements QualityAnalyzerContract {

  constructor(

    private readonly validators:
      QualityValidators,

    private readonly scorer:
      QualityScorer,

  ) {}

  async analyze(
    input:
      QualityInput,
  ): Promise<QualityReport> {

    const results =
      await this.validators.execute(
        input,
      );

    return this.scorer.score(
      results,
    );

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualityAnalyzer =
  QualityAnalyzer;
