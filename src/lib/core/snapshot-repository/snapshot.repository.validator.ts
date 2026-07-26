/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY VALIDATOR
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Validates repository records before persistence.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase
 * ✗ Execute SQL
 * ✗ Upload Storage
 * ✗ Execute Repository logic
 *
 * ============================================================
 */

import type {
  SnapshotRepositoryRecord,
} from "./snapshot.repository.types";


/**
 * ============================================================
 * Validation Result
 * ============================================================
 */
export interface SnapshotRepositoryValidationResult {

  readonly valid:

    boolean;

  readonly errors:

    readonly string[];

}


/**
 * ============================================================
 * Validator Contract
 * ============================================================
 */
export interface SnapshotRepositoryValidatorContract {

  validate(

    record:

      SnapshotRepositoryRecord,

  ):

    SnapshotRepositoryValidationResult;

}


/**
 * ============================================================
 * Snapshot Repository Validator
 * ============================================================
 */
export class SnapshotRepositoryValidator

  implements SnapshotRepositoryValidatorContract {


  validate(

    record:

      SnapshotRepositoryRecord,

  ):

    SnapshotRepositoryValidationResult {


    const errors:

      string[] = [];


    if (!record.identity.snapshotId) {

      errors.push(

        "Snapshot ID is required.",

      );

    }


    if (!record.identity.productId) {

      errors.push(

        "Product ID is required.",

      );

    }


    if (!record.identity.organizationId) {

      errors.push(

        "Organization ID is required.",

      );

    }


    if (!record.snapshot) {

      errors.push(

        "Snapshot payload is required.",

      );

    }


    if (record.version < 1) {

      errors.push(

        "Snapshot version is invalid.",

      );

    }


    return {

      valid:

        errors.length === 0,

      errors,

    };

  }

}
