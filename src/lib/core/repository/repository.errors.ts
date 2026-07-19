/**
 * Repository Layer
 * Error Definitions
 *
 * Responsibility:
 * - Repository specific errors
 * - Typed error handling
 *
 * No:
 * - Database logic
 * - Supabase dependency
 * - Business rules
 */


export enum RepositoryErrorCode {
  NOT_FOUND = "REPOSITORY_NOT_FOUND",

  VALIDATION_FAILED = "REPOSITORY_VALIDATION_FAILED",

  DUPLICATE = "REPOSITORY_DUPLICATE",

  UNAUTHORIZED = "REPOSITORY_UNAUTHORIZED",

  FORBIDDEN = "REPOSITORY_FORBIDDEN",

  DATABASE_ERROR = "REPOSITORY_DATABASE_ERROR",

  TRANSACTION_FAILED = "REPOSITORY_TRANSACTION_FAILED",

  CACHE_ERROR = "REPOSITORY_CACHE_ERROR",

  UNKNOWN = "REPOSITORY_UNKNOWN_ERROR",
}



export class RepositoryError extends Error {
  readonly code: RepositoryErrorCode;

  readonly details?: unknown;


  constructor(
    code: RepositoryErrorCode,
    message: string,
    details?: unknown,
  ) {
    super(message);

    this.name = "RepositoryError";

    this.code = code;

    this.details = details;

    Object.setPrototypeOf(
      this,
      RepositoryError.prototype,
    );
  }
}



export class RepositoryNotFoundError extends RepositoryError {
  constructor(
    entity: string,
    id: string,
  ) {
    super(
      RepositoryErrorCode.NOT_FOUND,
      `${entity} not found: ${id}`,
      {
        entity,
        id,
      },
    );

    this.name = "RepositoryNotFoundError";
  }
}



export class RepositoryValidationError extends RepositoryError {
  constructor(
    message: string,
    details?: unknown,
  ) {
    super(
      RepositoryErrorCode.VALIDATION_FAILED,
      message,
      details,
    );

    this.name = "RepositoryValidationError";
  }
}



export class RepositoryDuplicateError extends RepositoryError {
  constructor(
    entity: string,
    identifier: string,
  ) {
    super(
      RepositoryErrorCode.DUPLICATE,
      `${entity} already exists: ${identifier}`,
      {
        entity,
        identifier,
      },
    );

    this.name = "RepositoryDuplicateError";
  }
}



export class RepositoryDatabaseError extends RepositoryError {
  constructor(
    message: string,
    details?: unknown,
  ) {
    super(
      RepositoryErrorCode.DATABASE_ERROR,
      message,
      details,
    );

    this.name = "RepositoryDatabaseError";
  }
}



export class RepositoryTransactionError extends RepositoryError {
  constructor(
    message: string,
    details?: unknown,
  ) {
    super(
      RepositoryErrorCode.TRANSACTION_FAILED,
      message,
      details,
    );

    this.name = "RepositoryTransactionError";
  }
}



export function isRepositoryError(
  error: unknown,
): error is RepositoryError {
  return (
    error instanceof RepositoryError
  );
}
