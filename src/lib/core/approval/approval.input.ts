/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE INPUT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Input contract for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Receive Quality Engine result
 * • Carry approval context
 * • Provide immutable approval input
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
  QualityResult,
} from "@/lib/core/quality/quality.types";

/* ============================================================
 * APPROVAL INPUT
 * ============================================================
 */

export interface ApprovalInput {

  /**
   * Quality Engine output
   */
  readonly quality:
    QualityResult;

  /**
   * Marketplace
   */
  readonly marketplace:
    string;

  /**
   * Language
   */
  readonly language:
    string;

  /**
   * Country
   */
  readonly country:
    string;

  /**
   * Approval request timestamp
   */
  readonly requestedAt:
    Date;

}
