/**
 * ==========================================================
 * UNIVERSAL STORE ERRORS
 * ==========================================================
 *
 * Domain error definitions for Universal Store.
 *
 * Responsibilities:
 * - Typed errors
 * - Error classification
 * - Safe error handling
 *
 * Rules:
 * - No logging
 * - No database dependency
 * - No infrastructure
 * ==========================================================
 */

import { UNIVERSAL_ERROR_CODES } from "./universal.constants";


/* ==========================================================
 * BASE ERROR
 * ========================================================== */

export class UniversalStoreError extends Error {

  readonly code: string;

  readonly metadata?: Readonly<Record<string, unknown>>;


  constructor(
    code: string,
    message: string,
    metadata?: Readonly<Record<string, unknown>>
  ) {
    super(message);

    this.name = "UniversalStoreError";

    this.code = code;

    this.metadata = metadata;

    Object.setPrototypeOf(
      this,
      UniversalStoreError.prototype
    );
  }

}


/* ==========================================================
 * ENTITY NOT FOUND
 * ========================================================== */

export class UniversalEntityNotFoundError
  extends UniversalStoreError {

  constructor(
    entityId: string
  ) {

    super(
      UNIVERSAL_ERROR_CODES.ENTITY_NOT_FOUND,
      `Universal entity not found: ${entityId}`,
      {
        entityId,
      }
    );

    this.name =
      "UniversalEntityNotFoundError";
  }

}


/* ==========================================================
 * DUPLICATE ENTITY
 * ========================================================== */

export class UniversalDuplicateError
  extends UniversalStoreError {

  constructor(
    identity: string
  ) {

    super(
      UNIVERSAL_ERROR_CODES.DUPLICATE_ENTITY,
      `Duplicate universal entity: ${identity}`,
      {
        identity,
      }
    );

    this.name =
      "UniversalDuplicateError";
  }

}


/* ==========================================================
 * INVALID ENTITY
 * ========================================================== */

export class UniversalValidationError
  extends UniversalStoreError {

  constructor(
    message: string,
    metadata?: Readonly<Record<string, unknown>>
  ) {

    super(
      UNIVERSAL_ERROR_CODES.INVALID_ENTITY,
      message,
      metadata
    );

    this.name =
      "UniversalValidationError";
  }

}


/* ==========================================================
 * STORAGE FAILURE
 * ========================================================== */

export class UniversalStorageError
  extends UniversalStoreError {

  constructor(
    message: string,
    metadata?: Readonly<Record<string, unknown>>
  ) {

    super(
      UNIVERSAL_ERROR_CODES.STORAGE_FAILURE,
      message,
      metadata
    );

    this.name =
      "UniversalStorageError";
  }

}


/* ==========================================================
 * TRANSACTION FAILURE
 * ========================================================== */

export class UniversalTransactionError
  extends UniversalStoreError {

  constructor(
    message: string,
    metadata?: Readonly<Record<string, unknown>>
  ) {

    super(
      UNIVERSAL_ERROR_CODES.TRANSACTION_FAILURE,
      message,
      metadata
    );

    this.name =
      "UniversalTransactionError";
  }

}
