/**
 * ==========================================================
 * SIGNAL ERRORS
 * ==========================================================
 *
 * Enterprise Signal Error Definitions
 *
 * Responsibilities:
 * - Signal domain error handling
 * - Error identification
 * - Safe debugging
 *
 * Rules:
 * - No business logic
 * - No calculation
 * - No side effects
 * ==========================================================
 */



/* ==========================================================
 * BASE SIGNAL ERROR
 * ==========================================================
 */

export class SignalError
  extends Error {


  readonly code:
    string;


  constructor(
    message: string,
    code: string = "SIGNAL_ERROR"
  ) {

    super(message);


    this.name =
      "SignalError";


    this.code =
      code;


  }


}



/* ==========================================================
 * INVALID INPUT ERROR
 * ==========================================================
 */

export class SignalInputError
  extends SignalError {


  constructor(
    message =
      "Invalid signal input"
  ) {

    super(
      message,
      "SIGNAL_INPUT_ERROR"
    );


    this.name =
      "SignalInputError";

  }


}



/* ==========================================================
 * CALCULATION ERROR
 * ==========================================================
 */

export class SignalCalculationError
  extends SignalError {


  constructor(
    message =
      "Signal calculation failed"
  ) {

    super(
      message,
      "SIGNAL_CALCULATION_ERROR"
    );


    this.name =
      "SignalCalculationError";

  }


}



/* ==========================================================
 * VALIDATION ERROR
 * ==========================================================
 */

export class SignalValidationError
  extends SignalError {


  constructor(
    message =
      "Signal validation failed"
  ) {

    super(
      message,
      "SIGNAL_VALIDATION_ERROR"
    );


    this.name =
      "SignalValidationError";

  }


}
