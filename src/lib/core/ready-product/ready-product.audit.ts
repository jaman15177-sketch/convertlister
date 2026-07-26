/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.audit.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Audit Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Product Change Tracking
 * ✓ User Activity Tracking
 * ✓ Compliance History
 * ✓ Admin Audit Logs
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ API
 *
 * ===========================================================
 */



/**
 * ===========================================================
 * Audit Action
 * ===========================================================
 */

export const READY_PRODUCT_AUDIT_ACTIONS = {

  CREATED:
    "CREATED",

  UPDATED:
    "UPDATED",

  VIEWED:
    "VIEWED",

  PURCHASED:
    "PURCHASED",

  PUBLISHED:
    "PUBLISHED",

  UNPUBLISHED:
    "UNPUBLISHED",

  ARCHIVED:
    "ARCHIVED",

  RESTORED:
    "RESTORED",

} as const;



export type ReadyProductAuditAction =
  typeof READY_PRODUCT_AUDIT_ACTIONS[
    keyof typeof READY_PRODUCT_AUDIT_ACTIONS
  ];



/**
 * ===========================================================
 * Actor Type
 * ===========================================================
 */

export const READY_PRODUCT_AUDIT_ACTOR_TYPES = {

  USER:
    "USER",

  ADMIN:
    "ADMIN",

  SYSTEM:
    "SYSTEM",

  AI:
    "AI",

} as const;



export type ReadyProductAuditActorType =
  typeof READY_PRODUCT_AUDIT_ACTOR_TYPES[
    keyof typeof READY_PRODUCT_AUDIT_ACTOR_TYPES
  ];



/**
 * ===========================================================
 * Audit Metadata
 * ===========================================================
 */

export interface ReadyProductAuditMetadata {

  readonly ipAddress?:
    string;


  readonly userAgent?:
    string;


  readonly source?:
    string;


  readonly extra?:
    Record<string, unknown>;

}



/**
 * ===========================================================
 * Audit Entry
 * ===========================================================
 */

export interface ReadyProductAuditEntry {


  readonly id:
    string;



  readonly productId:
    string;



  readonly organizationId?:
    string;



  readonly action:
    ReadyProductAuditAction;



  readonly actorId?:
    string;



  readonly actorType:
    ReadyProductAuditActorType;



  readonly metadata?:
    ReadyProductAuditMetadata;



  readonly previousValue?:
    unknown;



  readonly newValue?:
    unknown;



  readonly createdAt:
    string;

}



/**
 * ===========================================================
 * Audit Query
 * ===========================================================
 */

export interface ReadyProductAuditQuery {


  readonly productId?:
    string;



  readonly organizationId?:
    string;



  readonly actorId?:
    string;



  readonly action?:
    ReadyProductAuditAction;



  readonly fromDate?:
    string;



  readonly toDate?:
    string;

}



/**
 * ===========================================================
 * Audit Result
 * ===========================================================
 */

export interface ReadyProductAuditResult {


  readonly items:
    readonly ReadyProductAuditEntry[];



  readonly total:
    number;

}



/**
 * ===========================================================
 * Audit Factory Input
 * ===========================================================
 */

export interface CreateReadyProductAuditInput {


  readonly productId:
    string;



  readonly action:
    ReadyProductAuditAction;



  readonly actorType:
    ReadyProductAuditActorType;



  readonly actorId?:
    string;



  readonly organizationId?:
    string;



  readonly metadata?:
    ReadyProductAuditMetadata;



}



/**
 * ===========================================================
 * Audit Factory
 * ===========================================================
 */

export function createReadyProductAuditEntry(

  input:
    CreateReadyProductAuditInput,

): ReadyProductAuditEntry {


  return {


    id:
      crypto.randomUUID(),


    productId:
      input.productId,


    organizationId:
      input.organizationId,


    action:
      input.action,


    actorId:
      input.actorId,


    actorType:
      input.actorType,


    metadata:
      input.metadata,


    createdAt:
      new Date().toISOString(),


  };

}



/**
 * ===========================================================
 * Audit Guard
 * ===========================================================
 */

export function isReadyProductAuditEntry(

  value:
    unknown,

): value is ReadyProductAuditEntry {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const audit =
    value as Partial<ReadyProductAuditEntry>;



  return (

    typeof audit.id === "string" &&

    typeof audit.productId === "string" &&

    typeof audit.action === "string"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function isSystemReadyProductAudit(

  audit:
    ReadyProductAuditEntry,

): boolean {


  return (

    audit.actorType ===
      READY_PRODUCT_AUDIT_ACTOR_TYPES.SYSTEM

  );

}



export function isAIRelatedReadyProductAudit(

  audit:
    ReadyProductAuditEntry,

): boolean {


  return (

    audit.actorType ===
      READY_PRODUCT_AUDIT_ACTOR_TYPES.AI

  );

}
