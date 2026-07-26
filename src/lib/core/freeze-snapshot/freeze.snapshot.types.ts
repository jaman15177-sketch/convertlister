/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION TYPES
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines data models used when a frozen product
 * becomes a permanent snapshot.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Call Snapshot Engine
 * ✗ Access Database
 * ✗ Access Storage
 * ✗ Execute business rules
 *
 * ============================================================
 */


/* ============================================================
 * Freeze Snapshot Status
 * ============================================================
 */

export type FreezeSnapshotStatus =

  | "PENDING"

  | "PROCESSING"

  | "SNAPSHOT_CREATED"

  | "FAILED";



/* ============================================================
 * Freeze Snapshot Identity
 * ============================================================
 */

export interface FreezeSnapshotIdentity {


  readonly freezeId:

    string;


  readonly organizationId:

    string;


  readonly productId:

    string;

}



/* ============================================================
 * Freeze Snapshot Context
 * ============================================================
 */

export interface FreezeSnapshotContext {


  readonly identity:

    FreezeSnapshotIdentity;


  readonly approvedBy:

    string;


  readonly approvedAt:

    Date;


  readonly reason?:

    string;

}



/* ============================================================
 * Freeze Snapshot Request
 * ============================================================
 */

export interface FreezeSnapshotRequest {


  readonly context:

    FreezeSnapshotContext;


  readonly status:

    FreezeSnapshotStatus;

}



/* ============================================================
 * Freeze Snapshot Result
 * ============================================================
 */

export interface FreezeSnapshotResult {


  readonly freezeId:

    string;


  readonly snapshotId:

    string;


  readonly status:

    FreezeSnapshotStatus;


  readonly createdAt:

    Date;

}
