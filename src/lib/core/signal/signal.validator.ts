/**
 * ==========================================================
 * SIGNAL VALIDATOR
 * ==========================================================
 *
 * Enterprise Signal Validation Layer
 *
 * Responsibilities:
 * - Validate SignalResult integrity
 * - Protect downstream systems
 *
 * Rules:
 * - No calculation
 * - No decision change
 * - No mutation
 * ==========================================================
 */


import type {
  SignalResult,
} from "./signal.types";


import {
  SignalValidationError,
} from "./signal.errors";



/* ==========================================================
 * VALIDATOR
 * ==========================================================
 */

export class SignalValidator {



  static validate(
    result:
      SignalResult
  ): void {



    if (
      !result.productId
    ) {

      throw new SignalValidationError(
        "Signal productId missing"
      );

    }



    if (
      !result.signal
    ) {

      throw new SignalValidationError(
        "Signal status missing"
      );

    }



    if (
      result.metrics.overall < 0 ||
      result.metrics.overall > 100
    ) {

      throw new SignalValidationError(
        "Invalid overall score"
      );

    }



    if (
      result.optimizeAllowed &&
      result.signal !== "GREEN"
    ) {

      throw new SignalValidationError(
        "Only GREEN signal can enable AI optimization"
      );

    }


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalValidator =
  SignalValidator;
