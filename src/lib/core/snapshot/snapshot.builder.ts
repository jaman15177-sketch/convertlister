/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT BUILDER
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Build immutable ProductSnapshot objects.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Save to database
 * ✗ Upload storage
 * ✗ Call repository
 * ✗ Publish marketplace
 *
 * ============================================================
 */

import { randomUUID } from "node:crypto";

import type {
  SnapshotBuilderContract,
} from "./snapshot.contract";

import type {
  SnapshotInput,
} from "./snapshot.input";

import type {
  ProductSnapshot,
} from "./snapshot.types";

import {
  SNAPSHOT_DEFAULTS,
} from "./snapshot.constants";


/**
 * ============================================================
 * Snapshot Builder
 * ============================================================
 */
export class SnapshotBuilder

  implements SnapshotBuilderContract {


  build(

    input:

      SnapshotInput,

  ):

    ProductSnapshot {


    const now =

      new Date();


    return {

      identity: {

        snapshotId:

          randomUUID(),

        productId:

          input.freeze.productId,

        organizationId:

          input.organizationId,

      },

      metadata: {

        version:

          SNAPSHOT_DEFAULTS.INITIAL_VERSION,

        createdAt:

          now,

        createdBy:

          input.createdBy,

        source:

          input.source,

      },

      hash: {

        algorithm:

          SNAPSHOT_DEFAULTS.HASH_ALGORITHM,

        value:

          "",

      },

      payload:

        input.payload,

    };

  }

}
