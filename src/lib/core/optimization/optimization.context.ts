/**
 * ==========================================================
 * AI OPTIMIZATION CONTEXT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - AI optimization context
 * - Marketplace context
 * - Customer intent
 * - Optimization environment
 *
 * Rules:
 * - No AI execution
 * - No business logic
 * - No quality logic
 * - No approval logic
 * ==========================================================
 */


/* ==========================================================
 * CUSTOMER INTENT
 * ==========================================================
 */

export type CustomerIntent =

  | "BUY"

  | "COMPARE"

  | "DISCOVER"

  | "GIFT"

  | "PROFESSIONAL"

  | "GENERAL";


/* ==========================================================
 * MARKETPLACE CONTEXT
 * ==========================================================
 */

export interface MarketplaceContext {

  readonly marketplace:
    string;

  readonly language:
    string;

  readonly currency:
    string;

  readonly country:
    string;

}


/* ==========================================================
 * PRODUCT CONTEXT
 * ==========================================================
 */

export interface ProductContext {

  readonly category:
    string;

  readonly brand:
    string;

  readonly productType:
    string;

}


/* ==========================================================
 * CUSTOMER CONTEXT
 * ==========================================================
 */

export interface CustomerContext {

  readonly intent:
    CustomerIntent;

  readonly audience:
    string;

}


/* ==========================================================
 * OPTIMIZATION CONTEXT
 * ==========================================================
 */

export interface OptimizationContext {

  readonly marketplace:
    MarketplaceContext;

  readonly product:
    ProductContext;

  readonly customer:
    CustomerContext;

}
