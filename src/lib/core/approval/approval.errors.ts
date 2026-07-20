/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE ERRORS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Centralized error hierarchy for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define approval errors
 * • Standardize error types
 * • Preserve stack traces
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
 * BASE ERROR
 * ============================================================
 */

export class ApprovalError
  extends Error {

  constructor(
    message: string,
  ) {

    super(message);

    this.name =
      "ApprovalError";

  }

}

/* ============================================================
 * INPUT ERROR
 * ============================================================
 */

export class ApprovalInputError
  extends ApprovalError {

  constructor(
    message =
      "Invalid approval input.",
  ) {

    super(message);

    this.name =
      "ApprovalInputError";

  }

}

/* ============================================================
 * POLICY ERROR
 * ============================================================
 */

export class ApprovalPolicyError
  extends ApprovalError {

  constructor(
    message =
      "Approval policy evaluation failed.",
  ) {

    super(message);

    this.name =
      "ApprovalPolicyError";

  }

}

/* ============================================================
 * DECISION ERROR
 * ============================================================
 */

export class ApprovalDecisionError
  extends ApprovalError {

  constructor(
    message =
      "Approval decision failed.",
  ) {

    super(message);

    this.name =
      "ApprovalDecisionError";

  }

}

/* ============================================================
 * AUDIT ERROR
 * ============================================================
 */

export class ApprovalAuditError
  extends ApprovalError {

  constructor(
    message =
      "Approval audit failed.",
  ) {

    super(message);

    this.name =
      "ApprovalAuditError";

  }

}

/* ============================================================
 * ENGINE ERROR
 * ============================================================
 */

export class ApprovalEngineError
  extends ApprovalError {

  constructor(
    message =
      "Approval engine execution failed.",
  ) {

    super(message);

    this.name =
      "ApprovalEngineError";

  }

}
