/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE ERRORS
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines Snapshot domain errors.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute snapshot logic
 * ✗ Access database
 * ✗ Access repository
 *
 * ============================================================
 */


/**
 * ============================================================
 * Base Snapshot Error
 * ============================================================
 */
export class SnapshotError extends Error {


  readonly name: string =
    "SnapshotError";



  constructor(

    message:
      string,

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      SnapshotError.prototype,

    );

  }

}



/**
 * ============================================================
 * Invalid Snapshot Error
 * ============================================================
 */
export class InvalidSnapshotError

  extends SnapshotError {


  readonly name: string =

    "InvalidSnapshotError";



  constructor(

    message:

      string =

        "Snapshot is invalid.",

  ) {

    super(message);



    Object.setPrototypeOf(

      this,

      InvalidSnapshotError.prototype,

    );

  }

}



/**
 * ============================================================
 * Snapshot Build Error
 * ============================================================
 */
export class SnapshotBuildError

  extends SnapshotError {


  readonly name: string =

    "SnapshotBuildError";



  constructor(

    message:

      string =

        "Snapshot build failed.",

  ) {

    super(message);



    Object.setPrototypeOf(

      this,

      SnapshotBuildError.prototype,

    );

  }

}



/**
 * ============================================================
 * Snapshot Validation Error
 * ============================================================
 */
export class SnapshotValidationError

  extends SnapshotError {


  readonly name: string =

    "SnapshotValidationError";



  constructor(

    message:

      string =

        "Snapshot validation failed.",

  ) {

    super(message);



    Object.setPrototypeOf(

      this,

      SnapshotValidationError.prototype,

    );

  }

}
