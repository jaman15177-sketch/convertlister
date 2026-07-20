/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE RULES
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Define approval enforcement rules.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define approval requirements
 * • Define mandatory checks
 * • Define rejection conditions
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval decision
 * ✗ Execute AI
 * ✗ Calculate quality score
 * ✗ Publish product
 * ✗ Persist database
 * ============================================================
 */


/* ============================================================
 * APPROVAL RULE
 * ============================================================
 */

export interface ApprovalRule {

  readonly name:
    string;

  readonly required:
    boolean;

  readonly description:
    string;

}


/* ============================================================
 * APPROVAL RULE SET
 * ============================================================
 */

export const approvalRules:
  readonly ApprovalRule[] = [

  {

    name:
      "QUALITY_SCORE_REQUIRED",

    required:
      true,

    description:
      "Product must pass minimum quality requirements.",

  },

  {

    name:
      "QUALITY_STATUS_REQUIRED",

    required:
      true,

    description:
      "Quality engine status must be valid.",

  },

  {

    name:
      "AUDIT_REQUIRED",

    required:
      true,

    description:
      "Every approval decision must generate an audit record.",

  },

  {

    name:
      "POLICY_CHECK_REQUIRED",

    required:
      true,

    description:
      "Approval policy must be evaluated before decision.",

  },

] as const;
