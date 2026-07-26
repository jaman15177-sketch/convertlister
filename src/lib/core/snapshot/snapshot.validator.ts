/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT VALIDATOR
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Validate immutable ProductSnapshot before persistence.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Save database
 * ✗ Upload storage
 * ✗ Call repository
 * ✗ Execute engine logic
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "./snapshot.types";


/**
 * ============================================================
 * Snapshot Validation Result
 * ============================================================
 */
export interface SnapshotValidationResult {


  readonly valid:

    boolean;



  readonly errors:

    readonly string[];

}



/**
 * ============================================================
 * Snapshot Validator Contract
 * ============================================================
 */
export interface SnapshotValidatorContract {


  validate(

    snapshot:

      ProductSnapshot,

  ):

    SnapshotValidationResult;

}



/**
 * ============================================================
 * Snapshot Validator
 * ============================================================
 */
export class SnapshotValidator

  implements SnapshotValidatorContract {


  validate(

    snapshot:

      ProductSnapshot,

  ):

    SnapshotValidationResult {


    const errors:

      string[] = [];


    if (!snapshot.identity.snapshotId) {

      errors.push(
        "Snapshot ID is required.",
      );

    }


    if (!snapshot.identity.productId) {

      errors.push(
        "Product ID is required.",
      );

    }


    if (!snapshot.identity.organizationId) {

      errors.push(
        "Organization ID is required.",
      );

    }


    if (!snapshot.metadata.createdBy) {

      errors.push(
        "CreatedBy is required.",
      );

    }


    if (!snapshot.payload) {

      errors.push(
        "Snapshot payload is required.",
      );

    }


    return {

      valid:

        errors.length === 0,

      errors,

    };

  }

}
