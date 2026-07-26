/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE CONTRACT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines Snapshot Engine boundaries.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Implement business logic
 * ✗ Access Supabase
 * ✗ Persist data
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Freeze Engine
 *        ↓
 * Snapshot Engine
 *        ↓
 * Snapshot Repository
 *
 * ============================================================
 */

import type {
  SnapshotInput,
} from "./snapshot.input";

import type {
  ProductSnapshot,
  SnapshotResult,
} from "./snapshot.types";


/**
 * ============================================================
 * Snapshot Engine Contract
 * ============================================================
 */
export interface SnapshotEngineContract {

  /**
   * Build immutable snapshot
   */
  create(

    input:
      SnapshotInput,

  ):
    Promise<ProductSnapshot>;



  /**
   * Create snapshot result
   */
  finalize(

    snapshot:
      ProductSnapshot,

  ):
    Promise<SnapshotResult>;

}


/**
 * ============================================================
 * Snapshot Builder Contract
 * ============================================================
 */
export interface SnapshotBuilderContract {

  /**
   * Build immutable snapshot
   */
  build(

    input:
      SnapshotInput,

  ):
    ProductSnapshot;

}
