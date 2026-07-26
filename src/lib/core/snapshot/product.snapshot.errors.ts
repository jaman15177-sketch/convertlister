/**
 * ===========================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT LAYER
 * ===========================================================
 *
 * File:
 * product.snapshot.errors.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Product Snapshot Error Definitions
 *
 * Layer
 * -----------------------------------------------------------
 * Error Layer
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ API
 * ✗ Marketplace
 * ✗ Business Logic
 *
 * ===========================================================
 */

/**
 * Base Error
 */
export class ProductSnapshotError extends Error {

  readonly code: string;

  constructor(
    code: string,
    message: string,
  ) {

    super(message);

    this.name = "ProductSnapshotError";

    this.code = code;

  }

}

/**
 * Validation Error
 */
export class ProductSnapshotValidationError
  extends ProductSnapshotError {

  constructor(
    message = "Product Snapshot validation failed",
  ) {

    super(
      "PRODUCT_SNAPSHOT_VALIDATION_ERROR",
      message,
    );

  }

}

/**
 * Not Found Error
 */
export class ProductSnapshotNotFoundError
  extends ProductSnapshotError {

  constructor(
    snapshotId: string,
  ) {

    super(
      "PRODUCT_SNAPSHOT_NOT_FOUND",
      `Snapshot not found: ${snapshotId}`,
    );

  }

}

/**
 * Duplicate Error
 */
export class ProductSnapshotDuplicateError
  extends ProductSnapshotError {

  constructor(
    snapshotId: string,
  ) {

    super(
      "PRODUCT_SNAPSHOT_DUPLICATE",
      `Duplicate snapshot: ${snapshotId}`,
    );

  }

}

/**
 * Repository Error
 */
export class ProductSnapshotRepositoryError
  extends ProductSnapshotError {

  constructor(
    message = "Repository operation failed",
  ) {

    super(
      "PRODUCT_SNAPSHOT_REPOSITORY_ERROR",
      message,
    );

  }

}

/**
 * Database Error
 */
export class ProductSnapshotDatabaseError
  extends ProductSnapshotError {

  constructor(
    message = "Database operation failed",
  ) {

    super(
      "PRODUCT_SNAPSHOT_DATABASE_ERROR",
      message,
    );

  }

}

/**
 * Storage Error
 */
export class ProductSnapshotStorageError
  extends ProductSnapshotError {

  constructor(
    message = "Storage operation failed",
  ) {

    super(
      "PRODUCT_SNAPSHOT_STORAGE_ERROR",
      message,
    );

  }

}

/**
 * Permission Error
 */
export class ProductSnapshotPermissionError
  extends ProductSnapshotError {

  constructor(
    message = "Permission denied",
  ) {

    super(
      "PRODUCT_SNAPSHOT_PERMISSION_DENIED",
      message,
    );

  }

}

/**
 * Version Conflict Error
 */
export class ProductSnapshotVersionConflictError
  extends ProductSnapshotError {

  constructor(
    message = "Snapshot version conflict",
  ) {

    super(
      "PRODUCT_SNAPSHOT_VERSION_CONFLICT",
      message,
    );

  }

}
