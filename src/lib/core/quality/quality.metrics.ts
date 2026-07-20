/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE METRICS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Quality metric definitions.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Metric names
 * • Metric weights
 * • Metric score structure
 * * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Call AI
 * ============================================================
 */

import type {
  QualityMetrics,
} from "./quality.types";

/* ============================================================
 * METRIC WEIGHT
 * ============================================================
 */

export interface QualityMetricWeight {

  readonly content: number;

  readonly seo: number;

  readonly conversion: number;

  readonly grammar: number;

  readonly readability: number;

  readonly consistency: number;

  readonly completeness: number;

}

/* ============================================================
 * DEFAULT WEIGHTS
 * ============================================================
 */

export const qualityMetricWeights:
  QualityMetricWeight = {

  content: 20,

  seo: 15,

  conversion: 20,

  grammar: 15,

  readability: 10,

  consistency: 10,

  completeness: 10,

};

/* ============================================================
 * EMPTY METRICS
 * ============================================================
 */

export const emptyQualityMetrics:
  QualityMetrics = {

  content: 0,

  seo: 0,

  conversion: 0,

  grammar: 0,

  readability: 0,

  consistency: 0,

  completeness: 0,

};
