/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE OUTPUT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Public output contract for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define final approval response
 * • Expose stable external structure
 * • Keep module boundary clean
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

import type {
  ApprovalDecision,
  ApprovalAudit,
} from "./approval.types";


/* ============================================================
 * APPROVAL OUTPUT
 * ============================================================
 */

export interface ApprovalOutput {

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
