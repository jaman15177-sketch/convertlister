/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE ERRORS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Database adapter specific errors.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase
 * ✗ Execute repository logic
 * ✗ Execute business logic
 *
 * ============================================================
 */


/* ============================================================
 * Base Error
 * ============================================================
 */

export class SnapshotDatabaseError extends Error {

  readonly name: string =
    "SnapshotDatabaseError";


  constructor(

    message: string,

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      new.target.prototype,

    );

  }

}


/* ============================================================
 * Insert Error
 * ============================================================
 */

export class SnapshotDatabaseInsertError

  extends SnapshotDatabaseError {

  readonly name: string =

    "SnapshotDatabaseInsertError";


  constructor(

    message =

      "Failed to insert snapshot.",

  ) {

    super(message);

  }

}


/* ============================================================
 * Update Error
 * ============================================================
 */

export class SnapshotDatabaseUpdateError

  extends SnapshotDatabaseError {

  readonly name: string =

    "SnapshotDatabaseUpdateError";


  constructor(

    message =

      "Failed to update snapshot.",

  ) {

    super(message);

  }

}


/* ============================================================
 * Not Found Error
 * ============================================================
 */

export class SnapshotDatabaseNotFoundError

  extends SnapshotDatabaseError {

  readonly name: string =

    "SnapshotDatabaseNotFoundError";


  constructor(

    message =

      "Snapshot was not found.",

  ) {

    super(message);

  }

}


/* ============================================================
 * Validation Error
 * ============================================================
 */

export class SnapshotDatabaseValidationError

  extends SnapshotDatabaseError {

  readonly name: string =

    "SnapshotDatabaseValidationError";


  constructor(

    message =

      "Snapshot database validation failed.",

  ) {

    super(message);

  }

}


/* ============================================================
 * Connection Error
 * ============================================================
 */

export class SnapshotDatabaseConnectionError

  extends SnapshotDatabaseError {

  readonly name: string =

    "SnapshotDatabaseConnectionError";


  constructor(

    message =

      "Database connection failed.",

  ) {

    super(message);

  }

}
