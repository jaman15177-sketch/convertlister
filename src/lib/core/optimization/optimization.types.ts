/**
 * ==========================================================
 * AI OPTIMIZATION TYPES
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Core type definitions
 * - Optimization data contracts
 * - AI output boundaries
 *
 * Rules:
 * - No AI execution
 * - No quality decision
 * - No approval logic
 * - No persistence
 *
 * Flow:
 *
 * Winning Product
 *        ↓
 * AI Optimization
 *        ↓
 * Quality Engine
 *        ↓
 * Approval Gate
 *
 * ==========================================================
 */


/* ==========================================================
 * OPTIMIZATION TYPE
 * ==========================================================
 */

export type OptimizationType =

  | "TITLE"

  | "DESCRIPTION"

  | "BULLET_POINTS"

  | "SEO"

  | "KEYWORDS"

  | "ATTRIBUTES"

  | "PRICE_POSITION"

  | "FULL_PRODUCT";



/* ==========================================================
 * OPTIMIZATION STATUS
 * ==========================================================
 */

export type OptimizationStatus =

  | "PENDING"

  | "PROCESSING"

  | "COMPLETED"

  | "FAILED";



/* ==========================================================
 * AI OPTIMIZATION REQUEST
 * ==========================================================
 */

export interface OptimizationRequest {

  readonly productId: string;

  readonly optimizationTypes:
    readonly OptimizationType[];

  readonly marketplace:
    string;

  readonly language:
    string;

}



/* ==========================================================
 * OPTIMIZED CONTENT
 * ==========================================================
 */

export interface OptimizedContent {

  readonly title:
    string;

  readonly description:
    string;

  readonly bullets:
    readonly string[];

  readonly keywords:
    readonly string[];

}



/* ==========================================================
 * AI OPTIMIZATION RESULT
 * ==========================================================
 */

export interface OptimizationResult {

  readonly id:
    string;

  readonly productId:
    string;

  readonly content:
    OptimizedContent;

  readonly status:
    OptimizationStatus;

  readonly createdAt:
    Date;

}
