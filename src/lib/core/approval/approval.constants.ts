/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE CONSTANTS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared constants for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Approval thresholds
 * • System identity
 * • Status constants
 * • Audit constants
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval logic
 * ✗ Execute policy
 * ✗ Execute AI
 * ✗ Execute quality validation
 * ✗ Persist database
 * ============================================================
 */

/* ============================================================
 * APPROVAL THRESHOLDS
 * ============================================================
 */

export const APPROVAL_THRESHOLD = {

  AUTO_APPROVE_SCORE: 95,

  MANUAL_REVIEW_SCORE: 85,

} as const;

/* ============================================================
 * SYSTEM
 * ============================================================
 */

export const APPROVAL_SYSTEM = {

  NAME:
    "Approval Gate",

  EXECUTOR:
    "SYSTEM",

} as const;

/* ============================================================
 * VERSION
 * ============================================================
 */

export const APPROVAL_VERSION = {

  ENGINE:
    "1.0.0",

} as const;

/* ============================================================
 * STATUS
 * ============================================================
 */

export const APPROVAL_STATUS = {

  APPROVED:
    "APPROVED",

  REJECTED:
    "REJECTED",

  MANUAL_REVIEW:
    "MANUAL_REVIEW",

} as const;

/* ============================================================
 * AUDIT
 * ============================================================
 */

export const APPROVAL_AUDIT = {

  ENABLED: true,

  IMMUTABLE: true,

} as const;
