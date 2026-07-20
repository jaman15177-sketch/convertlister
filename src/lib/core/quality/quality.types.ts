/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE PRODUCTION TYPES
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared types for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define quality contracts
 * • Define scoring models
 * • Define validator results
 * • Define engine output
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Calculate scores
 * ✗ Apply approval logic
 * ✗ Save database
 * ✗ Call AI
 * ============================================================
 */

/* ============================================================
 * QUALITY LEVEL
 * ============================================================
 */

export type QualityLevel =
  | "EXCELLENT"
  | "VERY_GOOD"
  | "GOOD"
  | "NEEDS_IMPROVEMENT"
  | "POOR";

/* ============================================================
 * QUALITY STATUS
 * ============================================================
 */

export type QualityStatus =
  | "PASSED"
  | "FAILED";

/* ============================================================
 * VALIDATOR RESULT
 * ============================================================
 */

export interface QualityValidatorResult {

  readonly validator: string;

  readonly score: number;

  readonly passed: boolean;

  readonly message: string;

}

/* ============================================================
 * QUALITY METRICS
 * ============================================================
 */

export interface QualityMetrics {

  readonly content: number;

  readonly seo: number;

  readonly conversion: number;

  readonly grammar: number;

  readonly readability: number;

  readonly consistency: number;

  readonly completeness: number;

}

/* ============================================================
 * QUALITY SUMMARY
 * ============================================================
 */

export interface QualitySummary {

  readonly score: number;

  readonly level: QualityLevel;

  readonly passed: boolean;

}

/* ============================================================
 * QUALITY REPORT
 * ============================================================
 */

export interface QualityReport {

  readonly validators:
    readonly QualityValidatorResult[];

  readonly metrics:
    QualityMetrics;

  readonly summary:
    QualitySummary;

}

/* ============================================================
 * QUALITY RESULT
 * ============================================================
 */

export interface QualityResult {

  readonly id: string;

  readonly productId: string;

  readonly status: QualityStatus;

  readonly report:
    QualityReport;

  readonly createdAt:
    Date;

}
