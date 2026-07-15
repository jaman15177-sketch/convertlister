/**
 * ==========================================================
 * IMPORT QUEUE HANDLER
 * ==========================================================
 *
 * Enterprise Queue → Import bridge
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Validate queue payload
 * • Map payload to ImportRequest
 * • Execute ImportEngine
 * • Return ImportResult
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize products
 * ✗ Generate canonical identity
 * ✗ Handle duplicates
 * ✗ Access database directly
 * ✗ Contain queue implementation
 *
 * ==========================================================
 */

import { importEngine } from "./import.engine";

import { ImportSource } from "./import.types";

import type {
  ImportRequest,
  ImportResult,
  ImportQueuePayload,
} from "./import.types";
export class ImportQueueHandler {

  /**
   * Execute Import Job
   */
  public async execute(
    payload: ImportQueuePayload
  ): Promise<ImportResult> {

    this.validatePayload(payload);

const source = validateImportSource(payload.source);

const request: ImportRequest = {
  organizationId: payload.organizationId,

  source,

  mode: payload.mode,

  products: payload.products,

  options: payload.options,
};

return importEngine.execute(request);
  }
  /* ========================================================
   * VALIDATION
   * ======================================================== */

  private validatePayload(
    payload: ImportQueuePayload
  ): void {

    if (!payload.source) {
  throw new Error(
    "Import source is required."
  );
}
    if (
      !payload.organizationId ||
      payload.organizationId.trim() === ""
    ) {
      throw new Error(
        "Organization ID is required."
      );
    }

    if (
      !payload.source ||
      payload.source.trim() === ""
    ) {
      throw new Error(
        "Import source is required."
      );
    }

    if (
      !Array.isArray(payload.products)
    ) {
      throw new Error(
        "Products must be an array."
      );
    }

  }

}

function validateImportSource(
  source: ImportSource
): ImportSource {
  if (!Object.values(ImportSource).includes(source)) {
    throw new Error(
      `Invalid import source: ${source}`
    );
  }

  return source;
}

/* ==========================================================
 * DEFAULT HANDLER
 * ========================================================== */

export const importQueueHandler =
  new ImportQueueHandler();
