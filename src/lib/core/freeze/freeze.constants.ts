/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE CONSTANTS
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Central freeze domain constants.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute freeze logic
 * ✗ Access database
 * ✗ Modify product data
 *
 * ============================================================
 */


/**
 * Freeze status values
 */
export const FREEZE_STATUS = {

  PENDING:
    "PENDING",

  FREEZING:
    "FREEZING",

  FROZEN:
    "FROZEN",

  FAILED:
    "FAILED",

  UNFROZEN:
    "UNFROZEN",

} as const;



/**
 * Freeze reasons
 */
export const FREEZE_REASON = {

  APPROVED_PRODUCT:
    "APPROVED_PRODUCT",

  MANUAL_APPROVAL:
    "MANUAL_APPROVAL",

  SYSTEM_POLICY:
    "SYSTEM_POLICY",

  RECOVERY:
    "RECOVERY",

} as const;



/**
 * Default freeze configuration
 */
export const FREEZE_DEFAULTS = {

  initialStatus:
    FREEZE_STATUS.PENDING,


  initialVersion:
    1,


  allowUnfreeze:
    false,


} as const;



/**
 * Freeze event names
 */
export const FREEZE_EVENTS = {

  FREEZE_STARTED:
    "FREEZE_STARTED",

  FREEZE_COMPLETED:
    "FREEZE_COMPLETED",

  FREEZE_FAILED:
    "FREEZE_FAILED",

} as const;
