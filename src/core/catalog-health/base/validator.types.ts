/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Validator Foundation Types
 * ============================================================
 *
 * Single Source of Truth
 *
 * ✓ Build-safe
 * ✓ Enterprise Ready
 * ✓ Backward Compatible
 * ✓ Runtime-free
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  CatalogMetadata,
} from "./metadata.engine";

import type {
  TelemetryReport,
} from "./telemetry.engine";

import type {
  HealthCategory,
  HealthIssue,
} from "../health.types";

/* ============================================================
 * VALIDATOR CONFIG
 * ============================================================
 */

export interface BaseValidatorConfig {
  readonly strictMode: boolean;

  readonly enableWarnings: boolean;

  readonly validatorVersion: string;
}

/* ============================================================
 * VALIDATOR CONTEXT
 * ============================================================
 */

export interface ValidatorContext {
  readonly marketplace: string;

  readonly strictMode: boolean;

  readonly validatorVersion: string;

  readonly enableWarnings: boolean;
}

/* ============================================================
 * VALIDATOR INPUT
 * ============================================================
 */

export interface ValidatorInput {
  readonly product: AdapterProduct;

  readonly context: ValidatorContext;
}

/* ============================================================
 * VALIDATOR RESULT
 * ============================================================
 */

export interface ValidatorResult {
  score: number;
readonly category: HealthCategory;
  issues: HealthIssue[];

  warnings: HealthIssue[];

  metadata?: CatalogMetadata;

  telemetry?: TelemetryReport;/**
 * ============================================================
 * Enterprise Finalization (SEOValidator V1)
 * ============================================================
 */

actionPlan?: {
  critical: string[];
  high: string[];
  medium: string[];
  low: string[];
};

nextBestAction?: string;

healthSummary?: {
  seoScore: number;
  weightedSeoScore: number;
  metaSeoScore: number;
  marketplaceSeoScore: number;
  priorityScore: number;

  totalCriticalIssues: number;
  totalHighPriorityIssues: number;
  totalMediumPriorityIssues: number;
  totalLowPriorityIssues: number;

  rankedIssueCount: number;
  recommendationCount: number;
};

overallHealthScore?: number;

overallHealthGrade?:
  | "A"
  | "B"
  | "C"
  | "D";

enterprise?: {
  actionPlan: {
    critical: string[];
    high: string[];
    medium: string[];
    low: string[];
  };

  nextBestAction: string;

  healthSummary: ValidatorResult["healthSummary"];

  overallHealthScore: number;

  overallHealthGrade:
    | "A"
    | "B"
    | "C"
    | "D";

  priorityScore: number;
};
}

/* ============================================================
 * VALIDATOR CONTRACT
 * ============================================================
 */

export interface CatalogValidator {
  readonly category: HealthCategory;

  validate(
    input: ValidatorInput
  ): Promise<ValidatorResult>;
}

/* ============================================================
 * SHARED TYPE HELPERS
 * ============================================================
 */

export type ValidatorResults =
  ReadonlyArray<ValidatorResult>;

export type ValidatorMap =
  ReadonlyMap<
    HealthCategory,
    CatalogValidator
  >;
