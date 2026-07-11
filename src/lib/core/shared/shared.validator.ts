/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Validator
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Generic validation helpers shared across all modules.
 *
 * Used By
 * ------------------------------------------------------------
 * ✓ Canonical
 * ✓ Repository
 * ✓ Universal Store
 * ✓ Import
 * ✓ Catalog Health
 * ✓ AI Pipeline
 *
 * MUST NOT contain
 * ------------------------------------------------------------
 * ✗ Business rules
 * ✗ Marketplace rules
 * ✗ Repository rules
 * ✗ Canonical rules
 * ✗ Database validation
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Runtime safe
 * ✓ Zero business logic
 * ✓ Enterprise reusable
 * ============================================================
 */

import {
  ErrorCode,
  SharedError,
} from "./shared.errors";

import {
  SharedUtility,
} from "./shared.utils";

/**
 * ============================================================
 * SHARED VALIDATOR
 * ============================================================
 */

export class SharedValidator {

  /**
   * Required string
   */
  public required(
    value: unknown,
    field: string
  ): void {

    if (
      typeof value !== "string" ||
      SharedUtility.isEmpty(value)
    ) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        `${field} is required.`,
        {
          field,
          value,
        }
      );

    }

  }

  /**
   * Maximum length
   */
  public maxLength(
    value: string,
    max: number,
    field: string
  ): void {

    if (value.length > max) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        `${field} exceeds maximum length.`,
        {
          field,
          value,
          metadata: {
            max,
          },
        }
      );

    }

  }

  /**
   * Minimum length
   */
  public minLength(
    value: string,
    min: number,
    field: string
  ): void {

    if (value.length < min) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        `${field} is too short.`,
        {
          field,
          value,
          metadata: {
            min,
          },
        }
      );

    }

  }

  /**
   * Positive number
   */
  public positive(
    value: number,
    field: string
  ): void {

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        `${field} must be positive.`,
        {
          field,
          value,
        }
      );

    }

  }

  /**
   * Non-empty array
   */
  public nonEmptyArray<T>(
    value: ReadonlyArray<T>,
    field: string
  ): void {

    if (value.length === 0) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        `${field} cannot be empty.`,
        {
          field,
        }
      );

    }

  }

  /**
   * Assertion
   */
  public assert(
    condition: boolean,
    message: string
  ): void {

    if (!condition) {

      throw new SharedError(
        ErrorCode.VALIDATION,
        message
      );

    }

  }

}

/**
 * ============================================================
 * SINGLETON
 * ============================================================
 */

export const SharedValidation =
  Object.freeze(
    new SharedValidator()
  );
