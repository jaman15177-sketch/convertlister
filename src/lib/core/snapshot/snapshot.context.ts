/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE CONTEXT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Execution context for Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute business logic
 * ✗ Access database
 * ✗ Access repository
 *
 * ============================================================
 */


/**
 * ============================================================
 * Snapshot Actor
 * ============================================================
 */
export interface SnapshotActorContext {


  /**
   * User or System Id
   */
  readonly actorId:

    string;



  /**
   * Execution type
   */
  readonly actorType:

    | "USER"

    | "SYSTEM";



}



/**
 * ============================================================
 * Snapshot Execution Context
 * ============================================================
 */
export interface SnapshotContext {


  /**
   * Request identifier
   */
  readonly requestId:

    string;



  /**
   * Correlation identifier
   */
  readonly correlationId:

    string;



  /**
   * Organization identifier
   */
  readonly organizationId:

    string;



  /**
   * Execution actor
   */
  readonly actor:

    SnapshotActorContext;



  /**
   * Execution timestamp
   */
  readonly executedAt:

    Date;



  /**
   * Snapshot version
   */
  readonly version:

    number;

}
