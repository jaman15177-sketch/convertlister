/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE TYPES
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable storage models.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Upload files
 * ✗ Access Supabase Storage
 * ✗ Execute repository logic
 * ✗ Execute business logic
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";


/* ============================================================
 * Storage Status
 * ============================================================
 */

export type SnapshotStorageStatus =

  | "PENDING"

  | "UPLOADED"

  | "FAILED";


/* ============================================================
 * Storage Record
 * ============================================================
 */

export interface SnapshotStorageRecord {

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

  readonly objectKey:

    string;

  readonly createdAt:

    Date;

}


/* ============================================================
 * Storage Result
 * ============================================================
 */

export interface SnapshotStorageResult {

  readonly snapshotId:

    string;

  readonly objectKey:

    string;

  readonly status:

    SnapshotStorageStatus;

  readonly uploadedAt:

    Date;

}
