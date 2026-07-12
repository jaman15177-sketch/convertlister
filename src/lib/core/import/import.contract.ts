/**
 * ==========================================================
 * IMPORT CONTRACT
 * ==========================================================
 *
 * Enterprise Import Engine Contract
 *
 * Responsibilities
 * - Import pipeline contract
 * - Async execution
 * - Multi-tenant support
 *
 * Rules
 * - Interface only
 * - No implementation
 * - No business logic
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  ImportRequest,
  ImportResult,
  ImportSource,
} from "./import.types";

/* ==========================================================
 * IMPORT ENGINE CONTRACT
 * ==========================================================
 */

export interface ImportEngineContract {

  /**
   * Import a single product.
   */
  executeSingle(
    product: RawProduct,
    source: ImportSource,
    organizationId: string
  ): Promise<AdapterProduct>;

  /**
   * Import a complete request.
   */
  execute(
    request: ImportRequest
  ): Promise<ImportResult>;

}
/**
 * ==========================================================
 * IMPORT SERVICE CONTRACT
 * ==========================================================
 */

export interface ImportService {

  import(
    request: ImportRequest
  ): Promise<ImportResult>;

}
/**
 * ==========================================================
 * IMPORT VALIDATOR CONTRACT
 * ==========================================================
 */

export interface ImportValidator {

  validate(
    request: ImportRequest
  ): void;

}
