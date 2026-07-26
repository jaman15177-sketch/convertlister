/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE CONFIGURATION
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for Freeze Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute freeze logic
 * ✗ Access database
 * ✗ Create snapshot
 *
 * ============================================================
 */


/**
 * Freeze Engine Configuration
 */
export interface FreezeConfig {


  /**
   * Allow only approved products
   */
  readonly requireApproval:

    boolean;



  /**
   * Allow creating immutable versions
   */
  readonly enableVersioning:

    boolean;



  /**
   * Allow unfreeze operation
   */
  readonly allowUnfreeze:

    boolean;



  /**
   * Audit tracking enabled
   */
  readonly enableAudit:

    boolean;

}



/**
 * Default Freeze Configuration
 */
export const DEFAULT_FREEZE_CONFIG:

  FreezeConfig = {


    requireApproval:
      true,


    enableVersioning:
      true,


    allowUnfreeze:
      false,


    enableAudit:
      true,


  };
