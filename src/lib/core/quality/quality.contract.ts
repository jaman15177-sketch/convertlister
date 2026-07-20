/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE CONTRACTS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Public contracts for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define engine interface
 * • Define validator interface
 * • Define scorer interface
 * • Define analyzer interface
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute quality logic
 * ✗ Calculate scores
 * ✗ Call AI
 * ✗ Persist data
 * ============================================================
 */

import type {
  QualityInput,
} from "./quality.input";

import type {
  QualityReport,
  QualityResult,
  QualityValidatorResult,
} from "./quality.types";
/* ============================================================
 * QUALITY ENGINE
 * ============================================================
 */

export interface QualityEngineContract {

  evaluate(
  input: QualityInput,
): Promise<QualityResult>;
}

/* ============================================================
 * QUALITY VALIDATOR
 * ============================================================
 */

export interface QualityValidatorContract {

  validate(
    input: QualityInput,
  ): Promise<QualityValidatorResult>;

}
/* ============================================================
 * QUALITY SCORER
 * ============================================================
 */

export interface QualityScorerContract {

  score(
    validators:
      readonly QualityValidatorResult[],
  ): QualityReport;

}

/* ============================================================
 * QUALITY ANALYZER
 * ============================================================
 */

export interface QualityAnalyzerContract {

  analyze(
    input: QualityInput,
  ): Promise<QualityReport>;

}
