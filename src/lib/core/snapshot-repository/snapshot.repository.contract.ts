/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY CONTRACT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines repository persistence contracts.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase directly
 * ✗ Execute SQL
 * ✗ Execute business logic
 * ✗ Build snapshot objects
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";

import type {
  SnapshotRepositoryResult,
} from "./snapshot.repository.types";



/**
 * ============================================================
 * Snapshot Repository Contract
 * ============================================================
 */
export interface SnapshotRepositoryContract {


  /**
   * Persist immutable snapshot.
   */
  save(

    snapshot:

      ProductSnapshot,

  ):

    Promise<SnapshotRepositoryResult>;



  /**
   * Find snapshot by identifier.
   */
  findById(

    snapshotId:

      string,

  ):

    Promise<ProductSnapshot | null>;



  /**
   * Check snapshot existence.
   */
  exists(

    snapshotId:

      string,

  ):

    Promise<boolean>;



  /**
   * Delete snapshot.
   *
   * (Soft delete policy can be implemented later.)
   */
  remove(

    snapshotId:

      string,

  ):

    Promise<void>;

}
