/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE AUDIT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Track freeze lifecycle events.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Store audit data directly
 * ✗ Access Supabase
 * ✗ Execute freeze logic
 *
 * ============================================================
 */



import type {
  FreezeStatus,
} from "./freeze.types";



/**
 * Freeze Audit Event
 */
export interface FreezeAuditEvent {


  /**
   * Product identity
   */
  readonly productId:

    string;



  /**
   * Previous status
   */
  readonly previousStatus:

    FreezeStatus | null;



  /**
   * New status
   */
  readonly newStatus:

    FreezeStatus;



  /**
   * Actor identity
   */
  readonly actorId:

    string;



  /**
   * Event timestamp
   */
  readonly createdAt:

    Date;



}



/**
 * Create Freeze Audit Event
 */
export function createFreezeAuditEvent(

  productId:

    string,

  previousStatus:

    FreezeStatus | null,

  newStatus:

    FreezeStatus,

  actorId:

    string,

):

  FreezeAuditEvent {


  return {


    productId,


    previousStatus,


    newStatus,


    actorId,


    createdAt:

      new Date(),


  };


}
