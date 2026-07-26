/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE TYPES
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable database persistence models.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase Client
 * ✗ Execute repository logic
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";


/**
 * ============================================================
 * Database Record Status
 * ============================================================
 */
export type SnapshotDatabaseStatus =

  | "PENDING"

  | "INSERTED"

  | "UPDATED"

  | "FAILED";


/**
 * ============================================================
 * Database Record
 * ============================================================
 */
export interface SnapshotDatabaseRecord {

  readonly snapshotId:

    string;

  readonly organizationId:

    string;

  readonly productId:

    string;

  readonly version:

    number;

  readonly payload:

    ProductSnapshot;

  readonly createdAt:

    Date;

}


/**
 * ============================================================
 * Database Result
 * ============================================================
 */
export interface SnapshotDatabaseResult {

  readonly snapshotId:

    string;

  readonly version:

    number;

  readonly status:

    SnapshotDatabaseStatus;

  readonly persistedAt:

    Date;

}
