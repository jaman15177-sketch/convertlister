/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY CONSTANTS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Central immutable constants used by the Snapshot Repository.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access database
 * ✗ Access storage
 * ✗ Execute repository logic
 * ✗ Execute snapshot engine
 *
 * ============================================================
 */


/**
 * ============================================================
 * Repository Status
 * ============================================================
 */
export const SNAPSHOT_REPOSITORY_STATUS = {

  PENDING:
    "PENDING",

  SAVED:
    "SAVED",

  FAILED:
    "FAILED",

} as const;


/**
 * ============================================================
 * Repository Operations
 * ============================================================
 */
export const SNAPSHOT_REPOSITORY_OPERATION = {

  SAVE:
    "SAVE",

  FIND:
    "FIND",

  EXISTS:
    "EXISTS",

  REMOVE:
    "REMOVE",

} as const;


/**
 * ============================================================
 * Repository Events
 * ============================================================
 */
export const SNAPSHOT_REPOSITORY_EVENT = {

  SAVE_STARTED:
    "SNAPSHOT_REPOSITORY_SAVE_STARTED",

  SAVE_COMPLETED:
    "SNAPSHOT_REPOSITORY_SAVE_COMPLETED",

  SAVE_FAILED:
    "SNAPSHOT_REPOSITORY_SAVE_FAILED",

} as const;


/**
 * ============================================================
 * Repository Defaults
 * ============================================================
 */
export const SNAPSHOT_REPOSITORY_DEFAULTS = {

  MAX_RETRY:

    3,

  TIMEOUT_MS:

    30_000,

} as const;
