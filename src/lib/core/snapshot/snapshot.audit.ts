/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT AUDIT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable audit events for Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access repository
 * ✗ Access Supabase
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  SnapshotStatus,
} from "./snapshot.types";


/**
 * ============================================================
 * Snapshot Audit Event
 * ============================================================
 */
export interface SnapshotAuditEvent {


  /**
   * Snapshot identifier
   */
  readonly snapshotId:

    string;



  /**
   * Product identifier
   */
  readonly productId:

    string;



  /**
   * Organization identifier
   */
  readonly organizationId:

    string;



  /**
   * Snapshot version
   */
  readonly version:

    number;



  /**
   * Snapshot status
   */
  readonly status:

    SnapshotStatus;



  /**
   * Event name
   */
  readonly event:

    string;



  /**
   * Actor identifier
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
 * ============================================================
 * Create Snapshot Audit Event
 * ============================================================
 */
export function createSnapshotAuditEvent(

  snapshotId: string,

  productId: string,

  organizationId: string,

  version: number,

  status: SnapshotStatus,

  event: string,

  actorId: string,

): SnapshotAuditEvent {


  return {

    snapshotId,

    productId,

    organizationId,

    version,

    status,

    event,

    actorId,

    createdAt:

      new Date(),

  };

}
