/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY CONTEXT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable execution context for repository operations.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute persistence
 * ✗ Access database
 * ✗ Access storage
 * ✗ Execute business logic
 *
 * ============================================================
 */


/**
 * ============================================================
 * Repository Actor Context
 * ============================================================
 */
export interface SnapshotRepositoryActorContext {


  /**
   * User or System identifier
   */
  readonly actorId:

    string;



  /**
   * Actor type
   */
  readonly actorType:

    | "USER"

    | "SYSTEM";

}


/**
 * ============================================================
 * Snapshot Repository Context
 * ============================================================
 */
export interface SnapshotRepositoryContext {


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

    SnapshotRepositoryActorContext;



  /**
   * Repository execution timestamp
   */
  readonly executedAt:

    Date;



  /**
   * Repository version
   */
  readonly version:

    number;

}
