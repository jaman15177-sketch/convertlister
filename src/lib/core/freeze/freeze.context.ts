/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE CONTEXT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Provides execution context for Freeze Engine.
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
 * Freeze Actor Context
 */
export interface FreezeActorContext {


  /**
   * User or system identity
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
 * Freeze Execution Context
 */
export interface FreezeContext {


  /**
   * Request correlation id
   */
  readonly requestId:

    string;



  /**
   * Organization scope
   */
  readonly organizationId:

    string;



  /**
   * Execution actor
   */
  readonly actor:

    FreezeActorContext;



  /**
   * Execution timestamp
   */
  readonly executedAt:

    Date;



}
