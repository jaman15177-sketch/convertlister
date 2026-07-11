import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import type { RawProduct } from "@/core/normalization/product-normalizer";

import type {
  ImportJob,
  ImportProgress,
  ImportRequest,
  ImportResult,
  ImportSource,
} from "./import.types";

/**
 * ==========================================================
 * IMPORT CONTRACTS
 * ==========================================================
 * Public contracts for the Import subsystem.
 *
 * Rules
 * - Interfaces only
 * - No business logic
 * - No infrastructure code
 * - No queue implementation
 * ==========================================================
 */

/* ==========================================================
 * IMPORT ADAPTER
 * ========================================================== */

export interface ImportAdapter {
  readonly source: ImportSource;

  fetchProducts(payload?: unknown): Promise<unknown[]>;
}

/* ==========================================================
 * IMPORT VALIDATOR
 * ========================================================== */

export interface ImportValidator {
  validate(request: ImportRequest): void;
}

/* ==========================================================
 * IMPORT ENGINE
 * ========================================================== */

export interface ImportEngineContract {
  execute(
    request: ImportRequest
  ): ImportResult;

  executeSingle(
    product: RawProduct,
    source: ImportSource
  ): AdapterProduct;
}

/* ==========================================================
 * IMPORT SERVICE
 * ========================================================== */

export interface ImportService {
  import(request: ImportRequest): Promise<ImportResult>;

  importSingle(
    product: unknown,
    source: ImportSource
  ): Promise<AdapterProduct>;

  createJob(request: ImportRequest): Promise<ImportJob>;

  getJob(jobId: string): Promise<ImportJob | null>;
}
