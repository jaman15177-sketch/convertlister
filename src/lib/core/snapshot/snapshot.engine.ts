/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Orchestrates immutable snapshot creation.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase
 * ✗ Save repository
 * ✗ Upload storage
 * ✗ Publish marketplace
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Freeze Engine
 *        ↓
 * Snapshot Builder
 *        ↓
 * Snapshot Validator
 *        ↓
 * ProductSnapshot
 *
 * ============================================================
 */

import type {
  SnapshotBuilderContract,
  SnapshotEngineContract,
} from "./snapshot.contract";

import type {
  SnapshotInput,
} from "./snapshot.input";

import type {
  ProductSnapshot,
  SnapshotResult,
} from "./snapshot.types";

import {
  SnapshotBuilder,
} from "./snapshot.builder";

import {
  SnapshotValidator,
} from "./snapshot.validator";

import {
  SnapshotBuildError,
  SnapshotValidationError,
} from "./snapshot.errors";


/**
 * ============================================================
 * Snapshot Engine
 * ============================================================
 */
export class SnapshotEngine

  implements SnapshotEngineContract {


  constructor(

    private readonly builder:

      SnapshotBuilderContract =

        new SnapshotBuilder(),

    private readonly validator =

      new SnapshotValidator(),

  ) {}



  async create(

    input:

      SnapshotInput,

  ):

    Promise<ProductSnapshot> {


    const snapshot =

      this.builder.build(input);


    const validation =

      this.validator.validate(snapshot);


    if (!validation.valid) {

      throw new SnapshotValidationError(

        validation.errors.join(", "),

      );

    }


    return snapshot;

  }



  async finalize(

    snapshot:

      ProductSnapshot,

  ):

    Promise<SnapshotResult> {


    if (!snapshot.identity.snapshotId) {

      throw new SnapshotBuildError(

        "Snapshot identifier is missing.",

      );

    }


    return {

      snapshotId:

        snapshot.identity.snapshotId,

      productId:

        snapshot.identity.productId,

      version:

        snapshot.metadata.version,

      status:

        "COMPLETED",

      createdAt:

        snapshot.metadata.createdAt,

    };

  }

}
