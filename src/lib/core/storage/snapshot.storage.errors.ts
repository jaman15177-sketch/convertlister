/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE ERRORS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Storage adapter specific error definitions.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Upload files
 * ✗ Access Supabase Storage
 * ✗ Execute repository logic
 * ✗ Execute business logic
 *
 * ============================================================
 */


/* ============================================================
 * Base Storage Error
 * ============================================================
 */

export class SnapshotStorageError extends Error {


  readonly name: string =

    "SnapshotStorageError";


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
 * Upload Error
 * ============================================================
 */

export class SnapshotStorageUploadError

  extends SnapshotStorageError {


  readonly name: string =

    "SnapshotStorageUploadError";


  constructor(

    message =

      "Failed to upload snapshot storage object.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Not Found Error
 * ============================================================
 */

export class SnapshotStorageNotFoundError

  extends SnapshotStorageError {


  readonly name: string =

    "SnapshotStorageNotFoundError";


  constructor(

    message =

      "Snapshot storage object was not found.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Validation Error
 * ============================================================
 */

export class SnapshotStorageValidationError

  extends SnapshotStorageError {


  readonly name: string =

    "SnapshotStorageValidationError";


  constructor(

    message =

      "Snapshot storage validation failed.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Connection Error
 * ============================================================
 */

export class SnapshotStorageConnectionError

  extends SnapshotStorageError {


  readonly name: string =

    "SnapshotStorageConnectionError";


  constructor(

    message =

      "Storage connection failed.",

  ) {

    super(message);

  }

}
