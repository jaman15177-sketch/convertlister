/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE ERRORS
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define freeze domain errors.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Handle errors
 * ✗ Log errors
 * ✗ Access database
 *
 * ============================================================
 */



/**
 * Base Freeze Error
 */
export class FreezeError extends Error {


  readonly name: string =
    "FreezeError";

  constructor(

    message:
      string,

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      FreezeError.prototype,

    );

  }

}



/**
 * Approval missing error
 */
export class FreezeApprovalRequiredError
  extends FreezeError {


  readonly name: string =
  "FreezeApprovalRequiredError";


  constructor() {

    super(
      "Product approval is required before freezing.",
    );

    Object.setPrototypeOf(

      this,

      FreezeApprovalRequiredError.prototype,

    );

  }

}



/**
 * Invalid freeze state error
 */
export class InvalidFreezeStateError
  extends FreezeError {


  readonly name: string =
  "InvalidFreezeStateError";


  constructor(

    message:
      string = "Invalid freeze state.",

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      InvalidFreezeStateError.prototype,

    );

  }

}



/**
 * Freeze operation failed error
 */
export class FreezeOperationError
  extends FreezeError {


  readonly name: string =
  "FreezeOperationError";

  constructor(

    message:
      string = "Freeze operation failed.",

  ) {

    super(message);

    Object.setPrototypeOf(

      this,

      FreezeOperationError.prototype,

    );

  }

}
