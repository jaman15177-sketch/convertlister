/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE CONTRACT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines storage persistence contract.
 *
 * This layer controls:
 * - upload
 * - retrieve
 * - existence check
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute business logic
 * ✗ Execute Snapshot Engine
 * ✗ Execute Repository orchestration
 * ✗ Access Database
 *
 * ============================================================
 */

import type {
  SnapshotStorageRecord,
  SnapshotStorageResult,
} from "./snapshot.storage.types";


/* ============================================================
 * Snapshot Storage Contract
 * ============================================================
 */

export interface SnapshotStorageContract {


  /**
   * Upload snapshot files/data
   */
  upload(

    record:

      SnapshotStorageRecord,

  ):

    Promise<SnapshotStorageResult>;



  /**
   * Find stored snapshot
   */
  find(

    objectKey:

      string,

  ):

    Promise<SnapshotStorageRecord | null>;



  /**
   * Check storage existence
   */
  exists(

    objectKey:

      string,

  ):

    Promise<boolean>;



  /**
   * Remove stored snapshot
   */
  remove(

    objectKey:

      string,

  ):

    Promise<void>;

}
