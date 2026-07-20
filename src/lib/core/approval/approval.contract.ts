/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE CONTRACTS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Public contracts for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define engine interface
 * • Define policy interface
 * • Define decision interface
 * • Define audit interface
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ✗ Execute quality validation
 * ✗ Persist database
 * ============================================================
 */

import type {
  ApprovalInput,
} from "./approval.input";

import type {
  ApprovalDecision,
  ApprovalResult,
  ApprovalAudit,
} from "./approval.types";

/* ============================================================
 * APPROVAL ENGINE
 * ============================================================
 */

export interface ApprovalEngineContract {

  evaluate(
    input: ApprovalInput,
  ): Promise<ApprovalResult>;

}

/* ============================================================
 * APPROVAL POLICY
 * ============================================================
 */

export interface ApprovalPolicyContract {

  evaluate(
    input: ApprovalInput,
  ): Promise<boolean>;

}

/* ============================================================
 * APPROVAL DECISION
 * ============================================================
 */

export interface ApprovalDecisionContract {

  decide(
    input: ApprovalInput,
  ): Promise<ApprovalDecision>;

}

/* ============================================================
 * APPROVAL AUDIT
 * ============================================================
 */

export interface ApprovalAuditContract {

  create(
    result: ApprovalResult,
  ): Promise<ApprovalAudit>;

}
