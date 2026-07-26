/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE ADAPTER
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Persists Snapshot records into the database.
 *
 * Current Stage
 * ------------------------------------------------------------
 * ✔ Contract
 * ✔ Mapper
 * ✔ Validator
 * ✔ Configuration
 * ✘ Supabase implementation (later)
 *
 * This adapter intentionally contains NO Supabase code.
 *
 * ============================================================
 */

import type {
  SnapshotDatabaseContract,
} from "./snapshot.database.contract";

import type {
  SnapshotDatabaseRecord,
  SnapshotDatabaseResult,
} from "./snapshot.database.types";

import {
  SnapshotDatabaseMapper,
} from "./snapshot.database.mapper";

import {
  SnapshotDatabaseValidator,
} from "./snapshot.database.validator";

import {
  SnapshotDatabaseValidationError,
} from "./snapshot.database.errors";


/* ============================================================
 * Snapshot Database Adapter
 * ============================================================
 */

export class SnapshotDatabase

  implements SnapshotDatabaseContract {


  constructor(

    private readonly mapper =

      new SnapshotDatabaseMapper(),

    private readonly validator =

      new SnapshotDatabaseValidator(),

  ) {}



  /**
   * ------------------------------------------------------------
   * Insert Snapshot
   * ------------------------------------------------------------
   */

  async insert(

  record:

    SnapshotDatabaseRecord,

):

    Promise<SnapshotDatabaseResult> {


    

    this.validate(record);


    /**
     * --------------------------------------------------------
     * Supabase INSERT
     * (Implemented later)
     * --------------------------------------------------------
     */


    return {

      snapshotId:

        record.snapshotId,

      version:

        record.version,

      status:

        "INSERTED",

      persistedAt:

        new Date(),

    };

  }



  /**
   * ------------------------------------------------------------
   * Update Snapshot
   * ------------------------------------------------------------
   */

  async update(

  record:

    SnapshotDatabaseRecord,

):

    Promise<SnapshotDatabaseResult> {


    

    this.validate(record);


    /**
     * --------------------------------------------------------
     * Supabase UPDATE
     * (Implemented later)
     * --------------------------------------------------------
     */


    return {

      snapshotId:

        record.snapshotId,

      version:

        record.version,

      status:

        "UPDATED",

      persistedAt:

        new Date(),

    };

  }



  /**
   * ------------------------------------------------------------
   * Find Snapshot
   * ------------------------------------------------------------
   */

  async findById(

    snapshotId:

      string,

  ):

    Promise<SnapshotDatabaseRecord | null> {


    void snapshotId;

    return null;

  }



  /**
   * ------------------------------------------------------------
   * Exists
   * ------------------------------------------------------------
   */

  async exists(

    snapshotId:

      string,

  ):

    Promise<boolean> {


    void snapshotId;

    return false;

  }



  /**
   * ------------------------------------------------------------
   * Internal Validation
   * ------------------------------------------------------------
   */

  private validate(

    record:

      SnapshotDatabaseRecord,

  ): void {


    const result =

      this.validator.validate(record);


    if (!result.valid) {

      throw new SnapshotDatabaseValidationError(

        result.errors.join(", "),

      );

    }

  }

}
