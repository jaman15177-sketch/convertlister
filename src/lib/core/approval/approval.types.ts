/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE TYPES
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared types for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define approval result
 * • Define approval decision
 * • Define approval status
 * • Define approval audit types
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
 * APPROVAL STATUS
 * ============================================================
 */

export type ApprovalStatus =

  | "APPROVED"

  | "REJECTED"

  | "MANUAL_REVIEW";

/* ============================================================
 * APPROVAL DECISION
 * ============================================================
 */

export interface ApprovalDecision {

  readonly status:
    ApprovalStatus;

  readonly reason:
    string;

  readonly policy:
    string;

}

/* ============================================================
 * APPROVAL AUDIT
 * ============================================================
 */

export interface ApprovalAudit {

  readonly executedBy:
    "SYSTEM";

  readonly timestamp:
    Date;

  readonly version:
    string;

}

/* ============================================================
 * APPROVAL RESULT
 * ============================================================
 */

export interface ApprovalResult {

  readonly id:
    string;

  readonly productId:
    string;

  readonly decision:
    ApprovalDecision;

  readonly audit:
    ApprovalAudit;

  readonly createdAt:
    Date;

}
