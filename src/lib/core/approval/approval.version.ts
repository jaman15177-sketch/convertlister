/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE VERSION
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Version management for Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Track engine version
 * • Track policy version
 * • Track rules version
 * • Track audit version
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
 * APPROVAL VERSION
 * ============================================================
 */

export interface ApprovalVersion {

  readonly engine:
    string;


  readonly policy:
    string;


  readonly rules:
    string;


  readonly audit:
    string;

}


/* ============================================================
 * CURRENT VERSION
 * ============================================================
 */

export const approvalVersion:
  ApprovalVersion = {


  engine:
    "1.0.0",


  policy:
    "1.0.0",


  rules:
    "1.0.0",


  audit:
    "1.0.0",


};


/* ============================================================
 * EXPORT
 * ============================================================
 */

export default approvalVersion;
