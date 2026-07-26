/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.health.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Catalog Health Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Catalog Health Score
 * ✓ Validation Status
 * ✓ Health Issues
 * ✓ Readiness Signal
 * ✓ Quality Monitoring
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Engine
 * ✗ API
 *
 * ===========================================================
 */



import type {
  ReadyProduct,
} from "./ready-product.types";



/**
 * ===========================================================
 * Health Status
 * ===========================================================
 */

export const READY_PRODUCT_HEALTH_STATUS = {

  HEALTHY:
    "HEALTHY",

  WARNING:
    "WARNING",

  CRITICAL:
    "CRITICAL",

  BLOCKED:
    "BLOCKED",

} as const;



export type ReadyProductHealthStatus =
  typeof READY_PRODUCT_HEALTH_STATUS[
    keyof typeof READY_PRODUCT_HEALTH_STATUS
  ];



/**
 * ===========================================================
 * Health Issue Severity
 * ===========================================================
 */

export const READY_PRODUCT_HEALTH_SEVERITY = {

  LOW:
    "LOW",

  MEDIUM:
    "MEDIUM",

  HIGH:
    "HIGH",

} as const;



export type ReadyProductHealthSeverity =
  typeof READY_PRODUCT_HEALTH_SEVERITY[
    keyof typeof READY_PRODUCT_HEALTH_SEVERITY
  ];



/**
 * ===========================================================
 * Health Issue
 * ===========================================================
 */

export interface ReadyProductHealthIssue {


  readonly code:
    string;



  readonly message:
    string;



  readonly severity:
    ReadyProductHealthSeverity;



  readonly field?:
    string;

}



/**
 * ===========================================================
 * Health Breakdown
 * ===========================================================
 */

export interface ReadyProductHealthBreakdown {


  readonly completenessScore:
    number;



  readonly contentScore:
    number;



  readonly imageScore:
    number;



  readonly seoScore:
    number;



  readonly totalScore:
    number;

}



/**
 * ===========================================================
 * Main Health Contract
 * ===========================================================
 */

export interface ReadyProductHealth {


  readonly productId:
    string;



  readonly status:
    ReadyProductHealthStatus;



  readonly score:
    number;



  readonly breakdown?:
    ReadyProductHealthBreakdown;



  readonly issues:
    readonly ReadyProductHealthIssue[];



  readonly readyForPublish:
    boolean;



  readonly checkedAt?:
    string;

}



/**
 * ===========================================================
 * Builder Input
 * ===========================================================
 */

export interface ReadyProductHealthBuilderInput {


  readonly product:
    ReadyProduct;



  readonly score:
    number;



  readonly issues?:
    readonly ReadyProductHealthIssue[];

}



/**
 * ===========================================================
 * Health Factory
 * ===========================================================
 */

export function createReadyProductHealth(

  input:
    ReadyProductHealthBuilderInput,

): ReadyProductHealth {


  const score =
    normalizeReadyProductHealthScore(
      input.score,
    );


  return {


    productId:
      input.product.id,


    score,


    status:
      resolveReadyProductHealthStatus(
        score,
      ),


    issues:
      input.issues ?? [],


    readyForPublish:
      score >= 80 &&
      (input.issues?.length ?? 0) === 0,


  };

}



/**
 * ===========================================================
 * Normalize Score
 * ===========================================================
 */

export function normalizeReadyProductHealthScore(

  score:
    number,

): number {


  if (score < 0) {

    return 0;

  }


  if (score > 100) {

    return 100;

  }


  return Math.round(score);

}



/**
 * ===========================================================
 * Resolve Status
 * ===========================================================
 */

export function resolveReadyProductHealthStatus(

  score:
    number,

): ReadyProductHealthStatus {


  if (score >= 80) {

    return READY_PRODUCT_HEALTH_STATUS.HEALTHY;

  }


  if (score >= 50) {

    return READY_PRODUCT_HEALTH_STATUS.WARNING;

  }


  if (score >= 20) {

    return READY_PRODUCT_HEALTH_STATUS.CRITICAL;

  }


  return READY_PRODUCT_HEALTH_STATUS.BLOCKED;

}



/**
 * ===========================================================
 * Health Guard
 * ===========================================================
 */

export function isReadyProductHealth(

  value:
    unknown,

): value is ReadyProductHealth {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const health =
    value as Partial<ReadyProductHealth>;



  return (

    typeof health.productId === "string" &&

    typeof health.score === "number"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function isReadyProductHealthy(

  health:
    ReadyProductHealth,

): boolean {


  return (

    health.status ===
      READY_PRODUCT_HEALTH_STATUS.HEALTHY

  );

}



export function hasReadyProductHealthIssues(

  health:
    ReadyProductHealth,

): boolean {


  return health.issues.length > 0;

}
