/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE TYPES
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable snapshot domain model.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access database
 * ✗ Call Supabase
 * ✗ Execute repository logic
 * ✗ Publish marketplace
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Freeze Engine
 *        ↓
 * Snapshot Engine
 *        ↓
 * Snapshot Repository
 *
 * ============================================================
 */


/**
 * Snapshot lifecycle status
 */
export type SnapshotStatus =

  | "PENDING"

  | "BUILDING"

  | "COMPLETED"

  | "FAILED";



/**
 * Snapshot payload hash
 */
export interface SnapshotHash {

  readonly algorithm:

    string;

  readonly value:

    string;

}



/**
 * Immutable snapshot metadata
 */
export interface SnapshotMetadata {

  readonly version:

    number;

  readonly createdAt:

    Date;

  readonly createdBy:

    string;

  readonly source:

    string;

}



/**
 * Snapshot identity
 */
export interface SnapshotIdentity {

  readonly snapshotId:

    string;

  readonly productId:

    string;

  readonly organizationId:

    string;

}



/**
 * Immutable Snapshot
 */
export interface ProductSnapshot {

  readonly identity:

    SnapshotIdentity;

  readonly metadata:

    SnapshotMetadata;

  readonly hash:

    SnapshotHash;

  readonly payload:

    unknown;

}



/**
 * Snapshot Result
 */
export interface SnapshotResult {

  readonly snapshotId:

    string;

  readonly productId:

    string;

  readonly version:

    number;

  readonly status:

    SnapshotStatus;

  readonly createdAt:

    Date;

}
