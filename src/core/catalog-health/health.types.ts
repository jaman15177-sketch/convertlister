/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Shared Health Types
 * ============================================================
 *
 * Production Final
 * Single Source of Truth
 * ============================================================
 */

import type { CatalogMetadata } from "./base/metadata.engine";
import type {
  RuleExecutionRecord,
  TelemetryReport,
} from "./base/telemetry.engine";

/* ============================================================
 * CATEGORY
 * ============================================================ */

export type HealthCategory =
  | "TITLE"
  | "DESCRIPTION"
  | "PRICE"
  | "IMAGE"
  | "CATEGORY"
  | "BRAND"
  | "VARIANT"
  | "SEO"
  | "DUPLICATE"
  | "MARKETPLACE";

/* ============================================================
 * SEVERITY
 * ============================================================ */

export type HealthSeverity =
  | "INFO"
  | "WARNING"
  | "CRITICAL";

/* ============================================================
 * STATUS
 * ============================================================ */

export type HealthStatus =
  | "EXCELLENT"
  | "GOOD"
  | "WARNING"
  | "FAILED";

/* ============================================================
 * ISSUE
 * ============================================================ */

export interface HealthIssue {
  readonly id: string;
  readonly category: HealthCategory;
  readonly severity: HealthSeverity;
  readonly code: string;
  readonly message: string;
  readonly suggestion?: string;
}

/* ============================================================
 * SCORE BREAKDOWN
 * ============================================================ */

export interface HealthScoreBreakdown {
  title: number;
  description: number;
  price: number;
  image: number;
  category: number;
  brand: number;
  variant: number;
  seo: number;
  duplicate: number;
  marketplace: number;
}

/* ============================================================
 * VALIDATOR RESULT
 * ============================================================ */

export interface ValidatorHealthResult {
  category: HealthCategory;
  score: number;
  issues: HealthIssue[];
  warnings: HealthIssue[];
  metadata?: CatalogMetadata;
  telemetry?: TelemetryReport;
}

/* ============================================================
 * FINAL ENGINE RESULT
 * ============================================================ */

export interface CatalogHealthResult {
  status: HealthStatus;
  overallScore: number;
  breakdown: HealthScoreBreakdown;
  issues: HealthIssue[];
  warnings: HealthIssue[];
  metadata?: CatalogMetadata;
  telemetry?: TelemetryReport;
  checkedAt: Date;
}

/* ============================================================
 * AGGREGATION
 * ============================================================ */

export interface AggregatedHealthResult {
  overallScore: number;
  status: HealthStatus;
  breakdown: HealthScoreBreakdown;
  issues: HealthIssue[];
  warnings: HealthIssue[];
}

/* ============================================================
 * TELEMETRY EXPORTS
 * ============================================================ */

export type {
  RuleExecutionRecord,
  TelemetryReport,
};
