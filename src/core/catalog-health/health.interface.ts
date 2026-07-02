/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Engine
 * ------------------------------------------------------------
 * Public Interfaces
 * ============================================================
 */

import type {
  CatalogHealthResult,
} from "./health.types";

/**
 * Generic validator.
 */
export interface HealthValidator<T = unknown> {
  validate(input: T): Promise<CatalogHealthResult>;
}

/**
 * Catalog Health Engine contract.
 */
export interface CatalogHealthEngine {
  analyze(
    product: unknown
  ): Promise<CatalogHealthResult>;
}

/**
 * Score calculator contract.
 */
export interface HealthScoreCalculator {
  calculate(
    result: CatalogHealthResult
  ): number;
}

/**
 * Rule contract.
 */
export interface HealthRule<T = unknown> {
  readonly name: string;

  execute(
    input: T
  ): Promise<CatalogHealthResult>;
}
