import type {
  CatalogMetadata,
} from "./metadata.engine";

import type {
  TelemetryReport,
} from "./telemetry.engine";

export interface ValidatorResult {
  score: number;

  issues: HealthIssue[];

  warnings: HealthIssue[];

  metadata?: CatalogMetadata;

  telemetry?: TelemetryReport;
}/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Validator Foundation Types
 * ============================================================
 *
 * Shared types used by every validator.
 *
 * Validators:
 *  - Title
 *  - Description
 *  - Price
 *  - Image
 *  - Category
 *  - Brand
 *  - Variant
 *  - SEO
 *  - Duplicate
 *  - Marketplace
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Shared contracts
 * ✓ Zero duplicated interfaces
 * ✓ Strong typing
 * ✓ Enterprise scalable
 * ✓ Build-safe
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  HealthCategory,
  HealthIssue,
} from "../health.types";

/**
 * ============================================================
 * VALIDATOR CONFIGURATION
 * ============================================================
 */

export interface BaseValidatorConfig {
  readonly strictMode: boolean;

  readonly enableWarnings: boolean;

  readonly validatorVersion: string;
}

/**
 * ============================================================
 * VALIDATOR CONTEXT
 * ============================================================
 */

export interface ValidatorContext {
  readonly marketplace: string;

  readonly strictMode: boolean;

  readonly validatorVersion: string;

  readonly enableWarnings: boolean;
}

/**
 * ============================================================
 * VALIDATOR INPUT
 * ============================================================
 */

export interface ValidatorInput {
  readonly product: AdapterProduct;

  readonly context: ValidatorContext;
}

/**
 * ============================================================
 * VALIDATOR RESULT
 * ============================================================
 */

export interface ValidatorResult {
  score: number;

  issues: HealthIssue[];

  warnings: HealthIssue[];
}

/**
 * ============================================================
 * BASE VALIDATOR CONTRACT
 * ============================================================
 */

export interface CatalogValidator {
  readonly category: HealthCategory;

  validate(
    input: ValidatorInput
  ): Promise<ValidatorResult>;
}
