/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Errors
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared error contracts used across every module.
 *
 * Rules
 * ------------------------------------------------------------
 * ✓ No business logic
 * ✓ No Canonical logic
 * ✓ No Repository logic
 * ✓ No Marketplace logic
 * ✓ Runtime-safe
 * ✓ Zero dependencies
 * ============================================================
 */

/* ============================================================
 * ERROR CODES
 * ============================================================
 */

export enum ErrorCode {
  UNKNOWN = "UNKNOWN",

  VALIDATION = "VALIDATION",

  NOT_FOUND = "NOT_FOUND",

  ALREADY_EXISTS = "ALREADY_EXISTS",

  INVALID_ARGUMENT = "INVALID_ARGUMENT",

  UNAUTHORIZED = "UNAUTHORIZED",

  FORBIDDEN = "FORBIDDEN",

  CONFLICT = "CONFLICT",

  TIMEOUT = "TIMEOUT",

  INTERNAL = "INTERNAL",
}

/* ============================================================
 * ERROR DETAILS
 * ============================================================
 */

export interface ErrorDetails {
  readonly field?: string;

  readonly value?: unknown;

  readonly cause?: unknown;

  readonly metadata?: Readonly<Record<string, unknown>>;
}

/* ============================================================
 * SHARED ERROR
 * ============================================================
 */

export class SharedError<
  TCode extends string = ErrorCode
> extends Error {

  public readonly code: TCode;

  public readonly details?: ErrorDetails;

  constructor(
    code: TCode,
    message: string,
    details?: ErrorDetails
  ) {
    super(message);

    this.name = "SharedError";

    this.code = code;

    this.details = details;

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

export const ErrorFactory = Object.freeze({
  validation(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.VALIDATION,
      message,
      details
    );
  },

  notFound(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.NOT_FOUND,
      message,
      details
    );
  },

  conflict(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.CONFLICT,
      message,
      details
    );
  },

  unauthorized(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.UNAUTHORIZED,
      message,
      details
    );
  },

  forbidden(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.FORBIDDEN,
      message,
      details
    );
  },

  internal(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.INTERNAL,
      message,
      details
    );
  },

  unknown(
    message: string,
    details?: ErrorDetails
  ): SharedError {
    return new SharedError(
      ErrorCode.UNKNOWN,
      message,
      details
    );
  },
});
