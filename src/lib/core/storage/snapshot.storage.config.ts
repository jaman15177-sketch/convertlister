/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE CONFIG
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for storage operations.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Upload files
 * ✗ Access Supabase Storage
 * ✗ Execute business logic
 * ✗ Execute repository logic
 *
 * ============================================================
 */


/* ============================================================
 * Snapshot Storage Configuration
 * ============================================================
 */

export interface SnapshotStorageConfig {


  /**
   * Storage bucket name
   */
  readonly bucketName:

    string;



  /**
   * Enable validation
   */
  readonly enableValidation:

    boolean;



  /**
   * Enable retry
   */
  readonly enableRetry:

    boolean;



  /**
   * Maximum retry attempts
   */
  readonly maxRetry:

    number;



  /**
   * Upload timeout
   */
  readonly timeoutMs:

    number;



  /**
   * Enable audit events
   */
  readonly enableAudit:

    boolean;

}


/* ============================================================
 * Default Storage Configuration
 * ============================================================
 */

export const DEFAULT_SNAPSHOT_STORAGE_CONFIG:

  SnapshotStorageConfig = {


    bucketName:

      "product-snapshots",


    enableValidation:

      true,


    enableRetry:

      true,


    maxRetry:

      3,


    timeoutMs:

      30_000,


    enableAudit:

      true,


  };
