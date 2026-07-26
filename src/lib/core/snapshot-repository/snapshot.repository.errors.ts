/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY ERRORS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Repository-specific domain errors.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute repository logic
 * ✗ Access database
 * ✗ Access storage
 *
 * ============================================================
 */


/**
 * ============================================================
 * Base Repository Error
 * ============================================================
 */
export class SnapshotRepositoryError extends Error {


  readonly name: string =

    "SnapshotRepositoryError";


  constructor(

    message: string,

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      SnapshotRepositoryError.prototype,

    );

  }

}


/**
 * ============================================================
 * Save Error
 * ============================================================
 */
export class SnapshotRepositorySaveError

  extends SnapshotRepositoryError {


  readonly name: string =

    "SnapshotRepositorySaveError";


  constructor(

    message: string =

      "Failed to persist snapshot.",

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      SnapshotRepositorySaveError.prototype,

    );

  }

}


/**
 * ============================================================
 * Not Found Error
 * ============================================================
 */
export class SnapshotRepositoryNotFoundError

  extends SnapshotRepositoryError {


  readonly name: string =

    "SnapshotRepositoryNotFoundError";


  constructor(

    message: string =

      "Snapshot was not found.",

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      SnapshotRepositoryNotFoundError.prototype,

    );

  }

}


/**
 * ============================================================
 * Validation Error
 * ============================================================
 */
export class SnapshotRepositoryValidationError

  extends SnapshotRepositoryError {


  readonly name: string =

    "SnapshotRepositoryValidationError";


  constructor(

    message: string =

      "Snapshot repository validation failed.",

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      SnapshotRepositoryValidationError.prototype,

    );

  }

}
