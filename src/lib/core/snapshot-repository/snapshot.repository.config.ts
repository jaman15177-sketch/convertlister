/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY CONFIGURATION
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for repository orchestration.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase
 * ✗ Upload files
 * ✗ Execute business logic
 *
 * ============================================================
 */


/**
 * ============================================================
 * Snapshot Repository Configuration
 * ============================================================
 */
export interface SnapshotRepositoryConfig {


  /**
   * Enable persistence validation
   */
  readonly enableValidation:

    boolean;



  /**
   * Enable audit events
   */
  readonly enableAudit:

    boolean;



  /**
   * Enable retry mechanism
   */
  readonly enableRetry:

    boolean;



  /**
   * Maximum retry attempts
   */
  readonly maxRetry:

    number;



  /**
   * Operation timeout (milliseconds)
   */
  readonly timeoutMs:

    number;

}



/**
 * ============================================================
 * Default Configuration
 * ============================================================
 */
export const DEFAULT_SNAPSHOT_REPOSITORY_CONFIG:

  SnapshotRepositoryConfig = {


    enableValidation:

      true,


    enableAudit:

      true,


    enableRetry:

      true,


    maxRetry:

      3,


    timeoutMs:

      30_000,

  };
