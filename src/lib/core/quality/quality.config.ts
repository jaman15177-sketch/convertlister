/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE CONFIGURATION
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Configuration for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Engine configuration
 * • Quality thresholds
 * • Validator configuration
 * • Runtime options
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

import {
  QUALITY_DEFAULTS,
  QUALITY_THRESHOLD,
} from "./quality.constants";

/* ============================================================
 * VALIDATOR CONFIGURATION
 * ============================================================
 */

export interface QualityValidatorConfig {

  readonly enabled: boolean;

  readonly weight: number;

}

/* ============================================================
 * QUALITY ENGINE CONFIGURATION
 * ============================================================
 */

export interface QualityConfig {

  readonly version: number;

  readonly passingScore: number;

  readonly threshold: {

    readonly excellent: number;

    readonly veryGood: number;

    readonly good: number;

    readonly needsImprovement: number;

  };

  readonly validators: {

    readonly content: QualityValidatorConfig;

    readonly seo: QualityValidatorConfig;

    readonly conversion: QualityValidatorConfig;

    readonly grammar: QualityValidatorConfig;

    readonly readability: QualityValidatorConfig;

    readonly consistency: QualityValidatorConfig;

    readonly completeness: QualityValidatorConfig;

  };

}

/* ============================================================
 * DEFAULT CONFIGURATION
 * ============================================================
 */

export const qualityConfig: QualityConfig = {

  version:
    QUALITY_DEFAULTS.VERSION,

  passingScore:
    QUALITY_DEFAULTS.PASSING_SCORE,

  threshold: {

    excellent:
      QUALITY_THRESHOLD.EXCELLENT,

    veryGood:
      QUALITY_THRESHOLD.VERY_GOOD,

    good:
      QUALITY_THRESHOLD.GOOD,

    needsImprovement:
      QUALITY_THRESHOLD.NEEDS_IMPROVEMENT,

  },

  validators: {

    content: {

      enabled: true,

      weight: 1,

    },

    seo: {

      enabled: true,

      weight: 1,

    },

    conversion: {

      enabled: true,

      weight: 1,

    },

    grammar: {

      enabled: true,

      weight: 1,

    },

    readability: {

      enabled: true,

      weight: 1,

    },

    consistency: {

      enabled: true,

      weight: 1,

    },

    completeness: {

      enabled: true,

      weight: 1,

    },

  },

};
