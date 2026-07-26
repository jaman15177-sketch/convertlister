/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION CONSTANTS
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Immutable values used by orchestration layer.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute workflow
 * ✗ Call Snapshot Engine
 * ✗ Access database/storage
 *
 * ============================================================
 */


/* ============================================================
 * Freeze Snapshot Status
 * ============================================================
 */

export const FREEZE_SNAPSHOT_STATUS = {

  PENDING:

    "PENDING",

  PROCESSING:

    "PROCESSING",

  SNAPSHOT_CREATED:

    "SNAPSHOT_CREATED",

  FAILED:

    "FAILED",

} as const;



/* ============================================================
 * Freeze Snapshot Operations
 * ============================================================
 */

export const FREEZE_SNAPSHOT_OPERATION = {

  CREATE:

    "CREATE_SNAPSHOT",

  VALIDATE:

    "VALIDATE_FREEZE",

} as const;



/* ============================================================
 * Freeze Snapshot Events
 * ============================================================
 */

export const FREEZE_SNAPSHOT_EVENT = {

  STARTED:

    "FREEZE_SNAPSHOT_STARTED",


  CREATED:

    "FREEZE_SNAPSHOT_CREATED",


  FAILED:

    "FREEZE_SNAPSHOT_FAILED",

} as const;



/* ============================================================
 * Freeze Snapshot Defaults
 * ============================================================
 */

export const FREEZE_SNAPSHOT_DEFAULTS = {


  RETRY_LIMIT:

    3,


  TIMEOUT_MS:

    30_000,


} as const;
