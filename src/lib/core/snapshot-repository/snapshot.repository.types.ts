/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY TYPES
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable repository domain models.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase
 * ✗ Execute SQL
 * ✗ Upload Storage
 * ✗ Execute Snapshot Engine logic
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";


/**
 * Repository Save Status
 */
export type SnapshotRepositoryStatus =

  | "PENDING"

  | "SAVED"

  | "FAILED";


/**
 * Repository Identity
 */
export interface SnapshotRepositoryIdentity {

  readonly snapshotId:

    string;

  readonly productId:

    string;

  readonly organizationId:

    string;

}


/**
 * Repository Record
 */
export interface SnapshotRepositoryRecord {

  readonly identity:

    SnapshotRepositoryIdentity;

  readonly snapshot:

    ProductSnapshot;

  readonly version:

    number;

  readonly persisted:

    boolean;

  readonly createdAt:

    Date;

}


/**
 * Repository Result
 */
export interface SnapshotRepositoryResult {

  readonly snapshotId:

    string;

  readonly version:

    number;

  readonly status:

    SnapshotRepositoryStatus;

  readonly persistedAt:

    Date;

}
