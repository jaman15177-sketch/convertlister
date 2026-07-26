/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE VALIDATOR
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Validates database records before persistence.
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

import type {
  SnapshotDatabaseRecord,
} from "./snapshot.database.types";


/* ============================================================
 * Validation Result
 * ============================================================
 */

export interface SnapshotDatabaseValidationResult {

  readonly valid:

    boolean;

  readonly errors:

    readonly string[];

}


/* ============================================================
 * Validator Contract
 * ============================================================
 */

export interface SnapshotDatabaseValidatorContract {

  validate(

    record:

      SnapshotDatabaseRecord,

  ):

    SnapshotDatabaseValidationResult;

}


/* ============================================================
 * Snapshot Database Validator
 * ============================================================
 */

export class SnapshotDatabaseValidator

  implements SnapshotDatabaseValidatorContract {


  validate(

    record:

      SnapshotDatabaseRecord,

  ):

    SnapshotDatabaseValidationResult {


    const errors: string[] = [];


    if (!record.snapshotId) {

      errors.push(

        "Snapshot ID is required.",

      );

    }


    if (!record.organizationId) {

      errors.push(

        "Organization ID is required.",

      );

    }


    if (!record.productId) {

      errors.push(

        "Product ID is required.",

      );

    }


    if (record.version < 1) {

      errors.push(

        "Snapshot version is invalid.",

      );

    }


    if (!record.payload) {

      errors.push(

        "Snapshot payload is required.",

      );

    }


    if (!(record.createdAt instanceof Date)) {

      errors.push(

        "CreatedAt must be a valid Date.",

      );

    }


    return {

      valid:

        errors.length === 0,

      errors,

    };

  }

}
