/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE CONTEXT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared evaluation context for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Marketplace context
 * • Product context
 * • Customer context
 * • Evaluation environment
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

/* ============================================================
 * MARKETPLACE CONTEXT
 * ============================================================
 */

export interface QualityMarketplaceContext {

  readonly marketplace: string;

  readonly language: string;

  readonly country: string;

  readonly currency: string;

}

/* ============================================================
 * PRODUCT CONTEXT
 * ============================================================
 */

export interface QualityProductContext {

  readonly productId: string;

  readonly category: string;

  readonly brand: string;

  readonly productType: string;

}

/* ============================================================
 * CUSTOMER CONTEXT
 * ============================================================
 */

export interface QualityCustomerContext {

  readonly audience: string;

  readonly intent: string;

}

/* ============================================================
 * EVALUATION CONTEXT
 * ============================================================
 */

export interface QualityEvaluationContext {

  readonly engineVersion: number;

  readonly requestedAt: Date;

}

/* ============================================================
 * QUALITY CONTEXT
 * ============================================================
 */

export interface QualityContext {

  readonly marketplace:
    QualityMarketplaceContext;

  readonly product:
    QualityProductContext;

  readonly customer:
    QualityCustomerContext;

  readonly evaluation:
    QualityEvaluationContext;

}
