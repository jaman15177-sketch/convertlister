/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE MAPPER
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Maps Repository models into Database records.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase
 * ✗ Execute business logic
 * ✗ Execute repository orchestration
 *
 * ============================================================
 */

import type {
  SnapshotRepositoryRecord,
} from "../snapshot-repository/snapshot.repository.types";

import type {
  SnapshotDatabaseRecord,
} from "./snapshot.database.types";


/* ============================================================
 * Mapper Contract
 * ============================================================
 */

export interface SnapshotDatabaseMapperContract {

  map(

    repositoryRecord:

      SnapshotRepositoryRecord,

  ):

    SnapshotDatabaseRecord;

}


/* ============================================================
 * Snapshot Database Mapper
 * ============================================================
 */

export class SnapshotDatabaseMapper

  implements SnapshotDatabaseMapperContract {


  map(

    repositoryRecord:

      SnapshotRepositoryRecord,

  ):

    SnapshotDatabaseRecord {


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

      createdAt:

        repositoryRecord.createdAt,

    };

  }

}
