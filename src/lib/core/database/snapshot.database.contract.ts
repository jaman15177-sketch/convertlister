/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE CONTRACT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines database persistence contract.
 *
 * This layer ONLY talks to the database.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute business logic
 * ✗ Execute Snapshot Engine
 * ✗ Execute Repository orchestration
 * ✗ Access Storage
 *
 * ============================================================
 */

import type {
  SnapshotDatabaseRecord,
  SnapshotDatabaseResult,
} from "./snapshot.database.types";


/**
 * ============================================================
 * Snapshot Database Contract
 * ============================================================
 */
export interface SnapshotDatabaseContract {


  /**
   * Insert Snapshot
   */
  insert(

    record:

      SnapshotDatabaseRecord,

  ):

    Promise<SnapshotDatabaseResult>;



  /**
   * Update Snapshot
   */
  update(

    record:

      SnapshotDatabaseRecord,

  ):

    Promise<SnapshotDatabaseResult>;



  /**
   * Find Snapshot
   */
  findById(

    snapshotId:

      string,

  ):

    Promise<SnapshotDatabaseRecord | null>;



  /**
   * Check Snapshot Exists
   */
  exists(

    snapshotId:

      string,

  ):

    Promise<boolean>;

}
