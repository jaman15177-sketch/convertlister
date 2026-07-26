/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION CONFIG
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Runtime configuration for freeze snapshot workflow.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute workflow
 * ✗ Call Snapshot Engine
 * ✗ Access Database
 * ✗ Access Storage
 *
 * ============================================================
 */


/* ============================================================
 * Freeze Snapshot Configuration
 * ============================================================
 */

export interface FreezeSnapshotConfig {


  /**
   * Enable snapshot creation
   */
  readonly enabled:

    boolean;



  /**
   * Validate approval before snapshot
   */
  readonly requireApproval:

    boolean;



  /**
   * Enable audit tracking
   */
  readonly enableAudit:

    boolean;



  /**
   * Retry failed snapshot creation
   */
  readonly enableRetry:

    boolean;



  /**
   * Maximum retry count
   */
  readonly retryLimit:

    number;



  /**
   * Workflow timeout
   */
  readonly timeoutMs:

    number;

}



/* ============================================================
 * Default Configuration
 * ============================================================
 */

export const DEFAULT_FREEZE_SNAPSHOT_CONFIG:

  FreezeSnapshotConfig = {


    enabled:

      true,


    requireApproval:

      true,


    enableAudit:

      true,


    enableRetry:

      true,


    retryLimit:

      3,


    timeoutMs:

      30_000,


  };
