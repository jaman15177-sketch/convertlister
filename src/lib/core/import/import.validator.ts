import {
  ImportMode,
  ImportSource,
  type ImportRequest,
} from "./import.types";

import type {
  ImportValidator,
} from "./import.contract";

import {
  DEFAULT_IMPORT_BATCH_SIZE,
  MIN_IMPORT_BATCH_SIZE,
  MAX_IMPORT_BATCH_SIZE,
} from "./import.constants";

/**
 * ==========================================================
 * IMPORT VALIDATOR
 * ==========================================================
 * Responsibilities
 * - Validate organization
 * - Validate source
 * - Validate mode
 * - Validate products
 * - Validate batch size
 *
 * Does NOT
 * - Normalize products
 * - Import products
 * - Access repository
 * - Access queue
 * ==========================================================
 */

export class DefaultImportValidator
  implements ImportValidator {

  validate(
    request: ImportRequest
  ): void {

    this.validateOrganization(request);
    this.validateSource(request);
    this.validateMode(request);
    this.validateProducts(request);
    this.validateBatchSize(request);

  }

  private validateOrganization(
    request: ImportRequest
  ): void {

    if (!request.organizationId.trim()) {
      throw new Error(
        "Organization ID is required."
      );
    }

  }

  private validateSource(
    request: ImportRequest
  ): void {

    if (
      !Object.values(ImportSource)
        .includes(request.source)
    ) {

      throw new Error(
        `Unsupported import source: ${request.source}`
      );

    }

  }

  private validateMode(
    request: ImportRequest
  ): void {

    if (
      !Object.values(ImportMode)
        .includes(request.mode)
    ) {

      throw new Error(
        `Unsupported import mode: ${request.mode}`
      );

    }

  }

  private validateProducts(
    request: ImportRequest
  ): void {

    if (!Array.isArray(request.products)) {

      throw new Error(
        "Products must be an array."
      );

    }

    if (request.products.length === 0) {

      throw new Error(
        "At least one product is required."
      );

    }

  }

  private validateBatchSize(
    request: ImportRequest
  ): void {

    const batchSize =
      request.options?.batchSize ??
      DEFAULT_IMPORT_BATCH_SIZE;

    if (!Number.isInteger(batchSize)) {

      throw new Error(
        "Batch size must be an integer."
      );

    }

    if (
      batchSize < MIN_IMPORT_BATCH_SIZE ||
      batchSize > MAX_IMPORT_BATCH_SIZE
    ) {

      throw new Error(
        `Batch size must be between ${MIN_IMPORT_BATCH_SIZE} and ${MAX_IMPORT_BATCH_SIZE}.`
      );

    }

  }

}

export const importValidator =
  new DefaultImportValidator();
