/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Errors
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Canonical domain-specific error contracts.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Canonical error codes
 * ✓ Canonical error factory
 * ✓ Type-safe error handling
 *
 * MUST NOT contain:
 * ✗ Database logic
 * ✗ Repository logic
 * ✗ Identity matching logic
 * ✗ Business workflow
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Extends shared error system
 * ✓ Stable API contract
 * ✓ Production safe
 * ============================================================
 */

import {
  SharedError,
} from "@/lib/core/shared/shared.errors";


/* ============================================================
 * CANONICAL ERROR CODES
 * ============================================================
 */

export enum CanonicalErrorCode {

  INVALID_PRODUCT =
    "CANONICAL_INVALID_PRODUCT",

  NORMALIZATION_FAILED =
    "CANONICAL_NORMALIZATION_FAILED",

  IDENTITY_FAILED =
    "CANONICAL_IDENTITY_FAILED",

  DUPLICATE_FOUND =
    "CANONICAL_DUPLICATE_FOUND",

  MERGE_FAILED =
    "CANONICAL_MERGE_FAILED",

  INVALID_KEY =
    "CANONICAL_INVALID_KEY",

  BUILD_FAILED =
    "CANONICAL_BUILD_FAILED",

}


/* ============================================================
 * CANONICAL ERROR
 * ============================================================
 */

export class CanonicalError
  extends SharedError<CanonicalErrorCode> {

  public readonly canonicalCode:
    CanonicalErrorCode;


  constructor(
    code: CanonicalErrorCode,
    message: string,
    details?: {
      readonly field?: string;

      readonly value?: unknown;

      readonly metadata?: Readonly<
        Record<string, unknown>
      >;
    }
  ) {

    super(
      code,
      message,
      details
    );


    this.name =
      "CanonicalError";


    this.canonicalCode =
      code;


    Object.setPrototypeOf(
      this,
      new.target.prototype
    );
  }
}


/* ============================================================
 * ERROR FACTORY
 * ============================================================
 */

export const CanonicalErrorFactory =
  Object.freeze({

    invalidProduct(
      message: string,
      details?: {
        readonly field?: string;
        readonly value?: unknown;
      }
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.INVALID_PRODUCT,
        message,
        details
      );
    },


    normalizationFailed(
      message: string
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.NORMALIZATION_FAILED,
        message
      );
    },


    identityFailed(
      message: string
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.IDENTITY_FAILED,
        message
      );
    },


    duplicateFound(
      message: string
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.DUPLICATE_FOUND,
        message
      );
    },


    mergeFailed(
      message: string
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.MERGE_FAILED,
        message
      );
    },


    buildFailed(
      message: string
    ): CanonicalError {

      return new CanonicalError(
        CanonicalErrorCode.BUILD_FAILED,
        message
      );
    },

  });
