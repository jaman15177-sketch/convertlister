/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT STORAGE CONSTANTS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Storage Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable constants for storage operations.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Upload files
 * ✗ Access Supabase Storage
 * ✗ Execute business logic
 * ✗ Execute repository logic
 *
 * ============================================================
 */


/* ============================================================
 * Storage Status
 * ============================================================
 */

export const SNAPSHOT_STORAGE_STATUS = {

  PENDING:

    "PENDING",

  UPLOADED:

    "UPLOADED",

  FAILED:

    "FAILED",

} as const;



/* ============================================================
 * Storage Operations
 * ============================================================
 */

export const SNAPSHOT_STORAGE_OPERATION = {

  UPLOAD:

    "UPLOAD",

  FIND:

    "FIND",

  EXISTS:

    "EXISTS",

  REMOVE:

    "REMOVE",

} as const;



/* ============================================================
 * Storage Events
 * ============================================================
 */

export const SNAPSHOT_STORAGE_EVENT = {

  UPLOAD_STARTED:

    "SNAPSHOT_STORAGE_UPLOAD_STARTED",

  UPLOAD_COMPLETED:

    "SNAPSHOT_STORAGE_UPLOAD_COMPLETED",

  UPLOAD_FAILED:

    "SNAPSHOT_STORAGE_UPLOAD_FAILED",

} as const;



/* ============================================================
 * Storage Defaults
 * ============================================================
 */

export const SNAPSHOT_STORAGE_DEFAULTS = {

  MAX_RETRY:

    3,


  TIMEOUT_MS:

    30_000,


  BUCKET_NAME:

    "product-snapshots",

} as const;
