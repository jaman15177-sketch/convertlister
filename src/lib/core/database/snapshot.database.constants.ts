/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT DATABASE CONSTANTS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Database Adapter
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable constants used by the Snapshot Database Adapter.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute SQL
 * ✗ Access Supabase
 * ✗ Execute business logic
 * ✗ Execute repository logic
 *
 * ============================================================
 */


/* ============================================================
 * Database Status
 * ============================================================
 */

export const SNAPSHOT_DATABASE_STATUS = {

  PENDING:
    "PENDING",

  INSERTED:
    "INSERTED",

  UPDATED:
    "UPDATED",

  FAILED:
    "FAILED",

} as const;


/* ============================================================
 * Database Operations
 * ============================================================
 */

export const SNAPSHOT_DATABASE_OPERATION = {

  INSERT:
    "INSERT",

  UPDATE:
    "UPDATE",

  FIND_BY_ID:
    "FIND_BY_ID",

  EXISTS:
    "EXISTS",

} as const;


/* ============================================================
 * Database Events
 * ============================================================
 */

export const SNAPSHOT_DATABASE_EVENT = {

  INSERT_STARTED:
    "SNAPSHOT_DATABASE_INSERT_STARTED",

  INSERT_COMPLETED:
    "SNAPSHOT_DATABASE_INSERT_COMPLETED",

  UPDATE_COMPLETED:
    "SNAPSHOT_DATABASE_UPDATE_COMPLETED",

  DATABASE_FAILED:
    "SNAPSHOT_DATABASE_FAILED",

} as const;


/* ============================================================
 * Database Defaults
 * ============================================================
 */

export const SNAPSHOT_DATABASE_DEFAULTS = {

  MAX_RETRY:

    3,

  TIMEOUT_MS:

    30_000,

  TABLE_NAME:

    "product_snapshots",

} as const;
