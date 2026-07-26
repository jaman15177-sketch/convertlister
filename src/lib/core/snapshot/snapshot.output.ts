/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE OUTPUT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable output returned by Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access repository
 * ✗ Access Supabase
 * ✗ Upload storage
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  SnapshotStatus,
} from "./snapshot.types";


/**
 * ============================================================
 * Snapshot Output
 * ============================================================
 */
export interface SnapshotOutput {


  /**
   * Snapshot identifier
   */
  readonly snapshotId:

    string;



  /**
   * Product identifier
   */
  readonly productId:

    string;



  /**
   * Organization identifier
   */
  readonly organizationId:

    string;



  /**
   * Immutable snapshot version
   */
  readonly version:

    number;



  /**
   * Snapshot lifecycle status
   */
  readonly status:

    SnapshotStatus;



  /**
   * Snapshot hash
   */
  readonly hash:

    string;



  /**
   * Snapshot creation timestamp
   */
  readonly createdAt:

    Date;

}
