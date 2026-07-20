/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE QUALITY RULES
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Centralized quality evaluation rules.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define quality requirements
 * • Define validator thresholds
 * • Define scoring weights
 * • Define pass criteria
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
} from "./quality.constants";

/* ============================================================
 * QUALITY RULE
 * ============================================================
 */

export interface QualityRule {

  readonly validator: string;

  readonly minimumScore: number;

  readonly weight: number;

  readonly required: boolean;

}

/* ============================================================
 * QUALITY RULE SET
 * ============================================================
 */

export const qualityRules:
  readonly QualityRule[] = [

  {

    validator: "content",

    minimumScore: 90,

    weight: 20,

    required: true,

  },

  {

    validator: "seo",

    minimumScore: 90,

    weight: 15,

    required: true,

  },

  {

    validator: "conversion",

    minimumScore: 95,

    weight: 20,

    required: true,

  },

  {

    validator: "grammar",

    minimumScore: 100,

    weight: 15,

    required: true,

  },

  {

    validator: "readability",

    minimumScore: 90,

    weight: 10,

    required: true,

  },

  {

    validator: "consistency",

    minimumScore: 95,

    weight: 10,

    required: true,

  },

  {

    validator: "completeness",

    minimumScore: 95,

    weight: 10,

    required: true,

  },

] as const;

/* ============================================================
 * PASS REQUIREMENT
 * ============================================================
 */

export const QUALITY_PASS_RULE = {

  minimumOverallScore:
    QUALITY_DEFAULTS.PASSING_SCORE,

} as const;
