/**
 * ============================================================
 * IMPORT CONTRACT
 * ============================================================
 * Public contracts for the Import subsystem.
 * ============================================================
 */

import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import type { RawProduct } from "@/core/normalization/product-normalizer";

import type {
  ImportAdapterRequest,
  ImportAdapterResponse,
  ImportJob,
  ImportRequest,
  ImportResult,
  ImportSource,
} from "./import.types";

/**
 * ============================================================
 * IMPORT ENGINE
 * ============================================================
 */

export interface ImportEngineContract {

  execute(
    request: ImportRequest
  ): Promise<ImportResult>;

}

/**
 * ============================================================
 * IMPORT SERVICE
 * ============================================================
 */

export interface ImportService {

  import(
    request: ImportRequest
  ): Promise<ImportResult>;

  importSingle(
    product: RawProduct,
    source: ImportSource,
    organizationId: string
  ): Promise<AdapterProduct>;

  createJob(
    request: ImportRequest
  ): Promise<ImportJob>;

  getJob(
    jobId: string
  ): Promise<ImportJob | null>;

}

/**
 * ============================================================
 * IMPORT VALIDATOR
 * ============================================================
 */

export interface ImportValidator {

  validate(
    request: ImportRequest
  ): void;

  validateAdapterRequest(
    request: ImportAdapterRequest
  ): void;

}

/**
 * ============================================================
 * IMPORT ORCHESTRATOR
 * ============================================================
 */

export interface ImportOrchestratorContract {

  fetch(
    request: ImportAdapterRequest
  ): Promise<ImportAdapterResponse>;

  import(
    request: ImportRequest
  ): Promise<ImportResult>;

}
