/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Coordinates snapshot persistence.
 *
 * Current Stage
 * ------------------------------------------------------------
 * ✔ Mapper
 * ✔ Validator
 * ✘ Database Adapter (next module)
 * ✘ Storage Adapter (next module)
 *
 * This repository intentionally contains NO Supabase code.
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";

import type {
  SnapshotRepositoryContract,
} from "./snapshot.repository.contract";

import type {
  SnapshotRepositoryResult,
} from "./snapshot.repository.types";

import {
  SnapshotRepositoryMapper,
} from "./snapshot.repository.mapper";

import {
  SnapshotRepositoryValidator,
} from "./snapshot.repository.validator";

import {
  SnapshotRepositoryValidationError,
} from "./snapshot.repository.errors";


/**
 * ============================================================
 * Snapshot Repository
 * ============================================================
 */
export class SnapshotRepository

  implements SnapshotRepositoryContract {


  constructor(

    private readonly mapper =

      new SnapshotRepositoryMapper(),

    private readonly validator =

      new SnapshotRepositoryValidator(),

  ) {}



  async save(

    snapshot:

      ProductSnapshot,

  ):

    Promise<SnapshotRepositoryResult> {


    const record =

      this.mapper.map(snapshot);


    const validation =

      this.validator.validate(record);


    if (!validation.valid) {

      throw new SnapshotRepositoryValidationError(

        validation.errors.join(", "),

      );

    }


    /**
     * Database Adapter
     * (Next module)
     */


    /**
     * Storage Adapter
     * (Next module)
     */


    return {

      snapshotId:

        record.identity.snapshotId,

      version:

        record.version,

      status:

        "SAVED",

      persistedAt:

        new Date(),

    };

  }



  async findById(

    snapshotId:

      string,

  ):

    Promise<ProductSnapshot | null> {


    void snapshotId;

    return null;

  }



  async exists(

    snapshotId:

      string,

  ):

    Promise<boolean> {


    void snapshotId;

    return false;

  }



  async remove(

    snapshotId:

      string,

  ):

    Promise<void> {


    void snapshotId;

  }

}
