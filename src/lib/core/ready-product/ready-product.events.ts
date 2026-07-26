/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.events.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Domain Event Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Domain Events
 * ✓ Event Payloads
 * ✓ Event Types
 * ✓ Queue Ready Architecture
 * ✓ Automation Trigger
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Queue Implementation
 * ✗ API
 *
 * ===========================================================
 */



/**
 * ===========================================================
 * Event Types
 * ===========================================================
 */

export const READY_PRODUCT_EVENTS = {

  CREATED:
    "READY_PRODUCT_CREATED",

  UPDATED:
    "READY_PRODUCT_UPDATED",

  SCORED:
    "READY_PRODUCT_SCORED",

  HEALTH_CHECKED:
    "READY_PRODUCT_HEALTH_CHECKED",

  FROZEN:
    "READY_PRODUCT_FROZEN",

  UNFROZEN:
    "READY_PRODUCT_UNFROZEN",

  PURCHASED:
    "READY_PRODUCT_PURCHASED",

  EXPORTED:
    "READY_PRODUCT_EXPORTED",

  PUBLISHED:
    "READY_PRODUCT_PUBLISHED",

  ARCHIVED:
    "READY_PRODUCT_ARCHIVED",

} as const;



export type ReadyProductEventType =
  typeof READY_PRODUCT_EVENTS[
    keyof typeof READY_PRODUCT_EVENTS
  ];



/**
 * ===========================================================
 * Event Source
 * ===========================================================
 */

export const READY_PRODUCT_EVENT_SOURCES = {

  USER:
    "USER",

  ADMIN:
    "ADMIN",

  SYSTEM:
    "SYSTEM",

  AI:
    "AI",

  MARKETPLACE:
    "MARKETPLACE",

} as const;



export type ReadyProductEventSource =
  typeof READY_PRODUCT_EVENT_SOURCES[
    keyof typeof READY_PRODUCT_EVENT_SOURCES
  ];



/**
 * ===========================================================
 * Event Metadata
 * ===========================================================
 */

export interface ReadyProductEventMetadata {


  readonly requestId?:
    string;



  readonly userId?:
    string;



  readonly organizationId?:
    string;



  readonly timestamp:
    string;



  readonly extra?:
    Record<string, unknown>;

}



/**
 * ===========================================================
 * Base Event Contract
 * ===========================================================
 */

export interface ReadyProductEvent<TPayload = unknown> {


  readonly id:
    string;



  readonly type:
    ReadyProductEventType;



  readonly source:
    ReadyProductEventSource;



  readonly productId:
    string;



  readonly payload:
    TPayload;



  readonly metadata:
    ReadyProductEventMetadata;

}



/**
 * ===========================================================
 * Product Created Event
 * ===========================================================
 */

export interface ReadyProductCreatedPayload {


  readonly title:
    string;



  readonly marketplace?:
    string;

}



/**
 * ===========================================================
 * Product Updated Event
 * ===========================================================
 */

export interface ReadyProductUpdatedPayload {


  readonly changedFields:
    readonly string[];

}



/**
 * ===========================================================
 * Score Event
 * ===========================================================
 */

export interface ReadyProductScoreEventPayload {


  readonly score:
    number;



  readonly confidenceScore?:
    number;

}



/**
 * ===========================================================
 * Health Event
 * ===========================================================
 */

export interface ReadyProductHealthEventPayload {


  readonly healthScore:
    number;



  readonly status:
    string;

}



/**
 * ===========================================================
 * Event Factory Input
 * ===========================================================
 */

export interface CreateReadyProductEventInput<TPayload = unknown> {


  readonly type:
    ReadyProductEventType;



  readonly source:
    ReadyProductEventSource;



  readonly productId:
    string;



  readonly payload:
    TPayload;



  readonly metadata?:
    Partial<ReadyProductEventMetadata>;

}



/**
 * ===========================================================
 * Event Factory
 * ===========================================================
 */

export function createReadyProductEvent<TPayload = unknown>(

  input:
    CreateReadyProductEventInput<TPayload>,

): ReadyProductEvent<TPayload> {


  return {


    id:
      crypto.randomUUID(),


    type:
      input.type,


    source:
      input.source,


    productId:
      input.productId,


    payload:
      input.payload,


    metadata: {

      timestamp:
        new Date().toISOString(),


      ...input.metadata,

    },

  };

}



/**
 * ===========================================================
 * Event Guard
 * ===========================================================
 */

export function isReadyProductEvent(

  value:
    unknown,

): value is ReadyProductEvent {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const event =
    value as Partial<ReadyProductEvent>;



  return (

    typeof event.id === "string" &&

    typeof event.type === "string" &&

    typeof event.productId === "string"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function isReadyProductLifecycleEvent(
  event: ReadyProductEvent,
): boolean {

  const lifecycleEvents: ReadonlySet<ReadyProductEventType> =
    new Set([
      READY_PRODUCT_EVENTS.CREATED,
      READY_PRODUCT_EVENTS.UPDATED,
      READY_PRODUCT_EVENTS.ARCHIVED,
    ]);

  return lifecycleEvents.has(event.type);

}
  
export function isReadyProductAIEvent(
  event: ReadyProductEvent,
): boolean {

  const aiEvents: ReadonlySet<ReadyProductEventType> =
    new Set([
      READY_PRODUCT_EVENTS.SCORED,
      READY_PRODUCT_EVENTS.HEALTH_CHECKED,
    ]);

  return aiEvents.has(event.type);

}

