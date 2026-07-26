/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION ERRORS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines workflow specific errors.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Call Snapshot Engine
 * ✗ Access Database
 * ✗ Access Storage
 *
 * ============================================================
 */


/* ============================================================
 * Base Error
 * ============================================================
 */

export class FreezeSnapshotError

  extends Error {


  readonly name: string =

    "FreezeSnapshotError";


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
 * Approval Required Error
 * ============================================================
 */

export class FreezeSnapshotApprovalRequiredError

  extends FreezeSnapshotError {


  readonly name: string =

    "FreezeSnapshotApprovalRequiredError";


  constructor(

    message =

      "Freeze approval is required before snapshot creation.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Invalid Freeze State Error
 * ============================================================
 */

export class FreezeSnapshotInvalidStateError

  extends FreezeSnapshotError {


  readonly name: string =

    "FreezeSnapshotInvalidStateError";


  constructor(

    message =

      "Freeze state is not valid for snapshot creation.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Snapshot Creation Failed Error
 * ============================================================
 */

export class FreezeSnapshotCreationError

  extends FreezeSnapshotError {


  readonly name: string =

    "FreezeSnapshotCreationError";


  constructor(

    message =

      "Snapshot creation failed during freeze workflow.",

  ) {

    super(message);

  }

}



/* ============================================================
 * Validation Error
 * ============================================================
 */

export class FreezeSnapshotValidationError

  extends FreezeSnapshotError {


  readonly name: string =

    "FreezeSnapshotValidationError";


  constructor(

    message =

      "Freeze snapshot validation failed.",

  ) {

    super(message);

  }

}
