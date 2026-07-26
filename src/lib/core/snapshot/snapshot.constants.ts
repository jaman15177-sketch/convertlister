/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE CONSTANTS
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Central immutable constants for Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute snapshot logic
 * ✗ Access database
 * ✗ Access repository
 *
 * ============================================================
 */


/**
 * Snapshot Status
 */
export const SNAPSHOT_STATUS = {

  PENDING:
    "PENDING",

  BUILDING:
    "BUILDING",

  COMPLETED:
    "COMPLETED",

  FAILED:
    "FAILED",

} as const;



/**
 * Hash Algorithms
 */
export const SNAPSHOT_HASH = {

  SHA256:
    "SHA-256",

} as const;



/**
 * Snapshot Source
 */
export const SNAPSHOT_SOURCE = {

  FREEZE_ENGINE:
    "FREEZE_ENGINE",

} as const;



/**
 * Snapshot Defaults
 */
export const SNAPSHOT_DEFAULTS = {

  INITIAL_VERSION:
    1,

  INITIAL_STATUS:
    SNAPSHOT_STATUS.PENDING,

  HASH_ALGORITHM:
    SNAPSHOT_HASH.SHA256,

} as const;



/**
 * Snapshot Events
 */
export const SNAPSHOT_EVENTS = {

  BUILD_STARTED:
    "SNAPSHOT_BUILD_STARTED",

  BUILD_COMPLETED:
    "SNAPSHOT_BUILD_COMPLETED",

  BUILD_FAILED:
    "SNAPSHOT_BUILD_FAILED",

} as const;
