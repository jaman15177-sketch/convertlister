/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE POLICY
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Define approval policy evaluation rules.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define policy contract implementation
 * • Check quality eligibility
 * • Provide approval policy decision
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Modify product data
 * ✗ Execute AI
 * ✗ Execute quality validation
 * ✗ Publish marketplace
 * ✗ Persist database
 * ============================================================
 */

import type {
  ApprovalPolicyContract,
} from "./approval.contract";

import type {
  ApprovalInput,
} from "./approval.input";

import {
  APPROVAL_THRESHOLD,
} from "./approval.constants";


export class ApprovalPolicy
  implements ApprovalPolicyContract {


  async evaluate(
    input:
      ApprovalInput,
  ): Promise<boolean> {


    const score =
      input.quality.report.summary.score;


    return (
      score >=
      APPROVAL_THRESHOLD.MANUAL_REVIEW_SCORE
    );

  }

}


/* ============================================================
 * EXPORT
 * ============================================================
 */

export const approvalPolicy =
  ApprovalPolicy;
