/**
 * ============================================================
 * CONVERTLISTER
 * APPROVAL GATE
 * ENTERPRISE CONTEXT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared execution context for the Approval Gate.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Marketplace context
 * • Product context
 * • Approval environment
 * • Runtime metadata
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
 * MARKETPLACE CONTEXT
 * ============================================================
 */

export interface ApprovalMarketplaceContext {

  readonly marketplace: string;

  readonly language: string;

  readonly country: string;

}

/* ============================================================
 * PRODUCT CONTEXT
 * ============================================================
 */

export interface ApprovalProductContext {

  readonly productId: string;

  readonly category: string;

  readonly brand: string;

}

/* ============================================================
 * QUALITY CONTEXT
 * ============================================================
 */

export interface ApprovalQualityContext {

  readonly score: number;

  readonly level: string;

  readonly status: string;

}

/* ============================================================
 * EXECUTION CONTEXT
 * ============================================================
 */

export interface ApprovalExecutionContext {

  readonly requestedAt: Date;

  readonly engineVersion: string;

  readonly executedBy: "SYSTEM";

}

/* ============================================================
 * APPROVAL CONTEXT
 * ============================================================
 */

export interface ApprovalContext {

  readonly marketplace:
    ApprovalMarketplaceContext;

  readonly product:
    ApprovalProductContext;

  readonly quality:
    ApprovalQualityContext;

  readonly execution:
    ApprovalExecutionContext;

}
