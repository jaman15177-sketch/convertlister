/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY MAPPER
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Maps Snapshot Engine models into Repository models.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase
 * ✗ Execute SQL
 * ✗ Upload Storage
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";

import type {
  SnapshotRepositoryRecord,
} from "./snapshot.repository.types";


/**
 * ============================================================
 * Snapshot Repository Mapper Contract
 * ============================================================
 */
export interface SnapshotRepositoryMapperContract {

  map(

    snapshot:
      ProductSnapshot,

  ):
    SnapshotRepositoryRecord;

}


/**
 * ============================================================
 * Snapshot Repository Mapper
 * ============================================================
 */
export class SnapshotRepositoryMapper

  implements SnapshotRepositoryMapperContract {


  map(

    snapshot:
      ProductSnapshot,

  ):
    SnapshotRepositoryRecord {


    return {

      identity: {

        snapshotId:

          snapshot.identity.snapshotId,

        productId:

          snapshot.identity.productId,

        organizationId:

          snapshot.identity.organizationId,

      },

      snapshot,

      version:

        snapshot.metadata.version,

      persisted:

        false,

      createdAt:

        snapshot.metadata.createdAt,

    };

  }

}
