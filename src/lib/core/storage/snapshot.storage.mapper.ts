/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE MAPPER
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Maps Snapshot Repository records into Storage records.
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
  SnapshotRepositoryRecord,
} from "../snapshot-repository/snapshot.repository.types";

import type {
  SnapshotStorageRecord,
} from "./snapshot.storage.types";



/* ============================================================
 * Mapper Contract
 * ============================================================
 */

export interface SnapshotStorageMapperContract {


  map(

    repositoryRecord:

      SnapshotRepositoryRecord,

  ):

    SnapshotStorageRecord;

}



/* ============================================================
 * Snapshot Storage Mapper
 * ============================================================
 */

export class SnapshotStorageMapper

  implements SnapshotStorageMapperContract {



  map(

    repositoryRecord:

      SnapshotRepositoryRecord,

  ):

    SnapshotStorageRecord {


    return {


      snapshotId:

        repositoryRecord.identity.snapshotId,



      organizationId:

        repositoryRecord.identity.organizationId,



      productId:

        repositoryRecord.identity.productId,



      version:

        repositoryRecord.version,



      payload:

        repositoryRecord.snapshot,



      objectKey:

        this.createObjectKey(

          repositoryRecord,

        ),



      createdAt:

        repositoryRecord.createdAt,


    };

  }



  /**
   * ----------------------------------------------------------
   * Generate Storage Object Key
   * ----------------------------------------------------------
   *
   * Example:
   *
   * org/product/snapshot/version.json
   *
   */

  private createObjectKey(

    record:

      SnapshotRepositoryRecord,

  ):

    string {


    return [

      record.identity.organizationId,

      record.identity.productId,

      record.identity.snapshotId,

      `v-${record.version}.json`,

    ].join("/");

  }


}
