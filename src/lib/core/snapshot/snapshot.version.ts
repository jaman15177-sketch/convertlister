/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT VERSION
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable snapshot version information.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access repository
 * ✗ Access Supabase
 * ✗ Execute business logic
 *
 * ============================================================
 */


/**
 * Snapshot Version
 */
export interface SnapshotVersion {


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
   * Snapshot version
   */
  readonly version:

    number;



  /**
   * Previous version
   */
  readonly previousVersion:

    number | null;



  /**
   * Whether this is the latest version
   */
  readonly latest:

    boolean;



  /**
   * Version creation time
   */
  readonly createdAt:

    Date;

}



/**
 * Initial Snapshot Version
 */
export const INITIAL_SNAPSHOT_VERSION = 1;
