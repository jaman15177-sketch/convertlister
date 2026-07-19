/**
 * ============================================================
 * IMPORT ORCHESTRATOR
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Execute marketplace adapters
 * • Coordinate import workflow
 * • Delegate processing to Import Engine
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Normalize products
 * ✗ Execute canonical logic
 * ✗ Save to Universal Store
 * ✗ Contain business rules
 * ============================================================
 */
import {
  importValidator,
} from "./import.validator";
import { AdapterRegistry } from "@/core/registry/adapter.registry";

import type {
  ImportAdapterRequest,
  ImportAdapterResponse,
  ImportRequest,
  ImportResult,
} from "./import.types";

import { importEngine } from "./import.engine";

export class ImportOrchestrator {

  /**
   * Execute marketplace adapter.
   */
  public async fetch(
    request: ImportAdapterRequest
  ): Promise<ImportAdapterResponse> {
 importValidator.validateAdapterRequest(
    request
  );
    const result =
      await AdapterRegistry.execute(
        request.source,
        request.query
      );

    if (!result.success) {

      throw new Error(
        result.error ??
        "Marketplace adapter failed."
      );

    }

    return {
      source: request.source,
      products: result.data,
    };

  }

  /**
   * Execute complete import pipeline.
   */
  public async import(
    request: ImportRequest
  ): Promise<ImportResult> {

    return importEngine.execute(
      request
    );

  }

}

export const importOrchestrator =
  new ImportOrchestrator();
