/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE CONFIG
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Runtime configuration for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Engine configuration
 * • Policy configuration
 * • Audit configuration
 * • Approval behavior
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

import {
  APPROVAL_THRESHOLD,
} from "./approval.constants";

/* ============================================================
 * APPROVAL CONFIG
 * ============================================================
 */

export interface ApprovalConfig {

  readonly autoApproveScore:
    number;

  readonly manualReviewScore:
    number;

  readonly auditEnabled:
    boolean;

  readonly immutableAudit:
    boolean;

  readonly allowManualReview:
    boolean;

}

/* ============================================================
 * DEFAULT CONFIG
 * ============================================================
 */

export const approvalConfig:
  ApprovalConfig = {

  autoApproveScore:
    APPROVAL_THRESHOLD.AUTO_APPROVE_SCORE,

  manualReviewScore:
    APPROVAL_THRESHOLD.MANUAL_REVIEW_SCORE,

  auditEnabled:
    true,

  immutableAudit:
    true,

  allowManualReview:
    true,

};

/* ============================================================
 * EXPORT
 * ============================================================
 */

export default approvalConfig;
