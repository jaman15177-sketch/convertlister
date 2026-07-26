/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE CONFIG
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for Snapshot Database Adapter.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase
 * ✗ Execute repository logic
 * ✗ Execute business logic
 *
 * ============================================================
 */


/* ============================================================
 * Snapshot Database Configuration
 * ============================================================
 */

export interface SnapshotDatabaseConfig {

  /**
   * Database table name
   */
  readonly tableName:

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
   * Operation timeout (milliseconds)
   */
  readonly timeoutMs:

    number;


  /**
   * Enable audit logging
   */
  readonly enableAudit:

    boolean;

}


/* ============================================================
 * Default Configuration
 * ============================================================
 */

export const DEFAULT_SNAPSHOT_DATABASE_CONFIG:
  SnapshotDatabaseConfig = {

  tableName:

    "product_snapshots",

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
