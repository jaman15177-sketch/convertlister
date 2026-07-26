/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE CONFIGURATION
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute snapshot logic
 * ✗ Access database
 * ✗ Access repository
 * ✗ Upload files
 *
 * ============================================================
 */


/**
 * Snapshot Engine Configuration
 */
export interface SnapshotConfig {


  /**
   * Enable immutable versioning
   */
  readonly enableVersioning:

    boolean;



  /**
   * Generate content hash
   */
  readonly enableHashing:

    boolean;



  /**
   * Validate snapshot before persistence
   */
  readonly enableValidation:

    boolean;



  /**
   * Record audit information
   */
  readonly enableAudit:

    boolean;



  /**
   * Allow payload compression
   */
  readonly enableCompression:

    boolean;

}



/**
 * Default Snapshot Configuration
 */
export const DEFAULT_SNAPSHOT_CONFIG:

  SnapshotConfig = {


    enableVersioning:
      true,


    enableHashing:
      true,


    enableValidation:
      true,


    enableAudit:
      true,


    enableCompression:
      false,


  };
