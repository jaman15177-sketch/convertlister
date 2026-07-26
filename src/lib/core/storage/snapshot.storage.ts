/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE ADAPTER
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Handles snapshot object storage lifecycle.
 *
 * Current Stage
 * ------------------------------------------------------------
 * ✔ Contract
 * ✔ Mapper
 * ✔ Validator
 * ✔ Configuration
 * ✘ Supabase Storage implementation (later)
 *
 * This adapter intentionally contains NO Supabase code.
 *
 * ============================================================
 */

import type {
  SnapshotStorageContract,
} from "./snapshot.storage.contract";

import type {
  SnapshotStorageRecord,
  SnapshotStorageResult,
} from "./snapshot.storage.types";

import {
  SnapshotStorageMapper,
} from "./snapshot.storage.mapper";

import {
  SnapshotStorageValidator,
} from "./snapshot.storage.validator";

import {
  SnapshotStorageValidationError,
} from "./snapshot.storage.errors";



/**
 * ============================================================
 * Snapshot Storage Adapter
 * ============================================================
 */

export class SnapshotStorage

  implements SnapshotStorageContract {



  constructor(

    private readonly mapper =

      new SnapshotStorageMapper(),


    private readonly validator =

      new SnapshotStorageValidator(),

  ) {}



  /**
   * ----------------------------------------------------------
   * Upload Snapshot
   * ----------------------------------------------------------
   */

  async upload(

  record:

    SnapshotStorageRecord,

):

    Promise<SnapshotStorageResult> {


    



    this.validate(record);



    /**
     * --------------------------------------------------------
     * Supabase Storage Upload
     *
     * Later:
     *
     * supabase.storage
     *   .from(bucket)
     *   .upload(path,file)
     *
     * --------------------------------------------------------
     */



    return {


      snapshotId:

        record.snapshotId,



      objectKey:

        record.objectKey,



      status:

        "UPLOADED",



      uploadedAt:

        new Date(),


    };

  }



  /**
   * ----------------------------------------------------------
   * Find Object
   * ----------------------------------------------------------
   */

  async find(

    objectKey:

      string,

  ):

    Promise<SnapshotStorageRecord | null> {


    void objectKey;


    return null;

  }



  /**
   * ----------------------------------------------------------
   * Exists
   * ----------------------------------------------------------
   */

  async exists(

    objectKey:

      string,

  ):

    Promise<boolean> {


    void objectKey;


    return false;

  }



  /**
   * ----------------------------------------------------------
   * Remove
   * ----------------------------------------------------------
   */

  async remove(

    objectKey:

      string,

  ):

    Promise<void> {


    void objectKey;

  }



  /**
   * ----------------------------------------------------------
   * Internal Validation
   * ----------------------------------------------------------
   */

  private validate(

    record:

      SnapshotStorageRecord,

  ): void {


    const result =

      this.validator.validate(record);



    if (!result.valid) {


      throw new SnapshotStorageValidationError(

        result.errors.join(", "),

      );

    }

  }


}
