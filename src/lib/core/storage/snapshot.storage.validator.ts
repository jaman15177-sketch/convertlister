/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE VALIDATOR
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Validates storage records before upload.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Upload files
 * ✗ Access Supabase Storage
 * ✗ Execute SQL
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  SnapshotStorageRecord,
} from "./snapshot.storage.types";



/* ============================================================
 * Validation Result
 * ============================================================
 */

export interface SnapshotStorageValidationResult {


  readonly valid:

    boolean;



  readonly errors:

    readonly string[];

}



/* ============================================================
 * Validator Contract
 * ============================================================
 */

export interface SnapshotStorageValidatorContract {


  validate(

    record:

      SnapshotStorageRecord,

  ):

    SnapshotStorageValidationResult;

}



/* ============================================================
 * Snapshot Storage Validator
 * ============================================================
 */

export class SnapshotStorageValidator

  implements SnapshotStorageValidatorContract {



  validate(

    record:

      SnapshotStorageRecord,

  ):

    SnapshotStorageValidationResult {


    const errors:

      string[] = [];



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



    if (!record.objectKey) {

      errors.push(

        "Storage object key is required.",

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
