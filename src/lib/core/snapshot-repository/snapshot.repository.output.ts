/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY OUTPUT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable output returned by the repository layer.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access database
 * ✗ Access storage
 * ✗ Execute repository logic
 *
 * ============================================================
 */

import type {
  SnapshotRepositoryStatus,
} from "./snapshot.repository.types";


/**
 * ============================================================
 * Snapshot Repository Output
 * ============================================================
 */
export interface SnapshotRepositoryOutput {


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
   * Snapshot version
   */
  readonly version:

    number;



  /**
   * Repository persistence status
   */
  readonly status:

    SnapshotRepositoryStatus;



  /**
   * Database persisted
   */
  readonly databaseSaved:

    boolean;



  /**
   * Storage persisted
   */
  readonly storageSaved:

    boolean;



  /**
   * Repository completion timestamp
   */
  readonly persistedAt:

    Date;

}
