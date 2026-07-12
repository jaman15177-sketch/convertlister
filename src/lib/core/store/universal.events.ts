/**
 * ==========================================================
 * UNIVERSAL EVENTS
 * ==========================================================
 *
 * Domain event definitions for Universal Store.
 *
 * Responsibilities:
 * - Strong typed events
 * - Entity lifecycle events
 * - Event payload contracts
 *
 * Rules:
 * - No event bus
 * - No queue
 * - No infrastructure
 * ==========================================================
 */


/* ==========================================================
 * EVENT TYPES
 * ========================================================== */

export enum UniversalEventType {

  CREATED = "ENTITY_CREATED",

  UPDATED = "ENTITY_UPDATED",

  DELETED = "ENTITY_DELETED",

  RESTORED = "ENTITY_RESTORED",

}



/* ==========================================================
 * BASE EVENT
 * ========================================================== */

export interface UniversalEvent {

  readonly id: string;

  readonly type: UniversalEventType;

  readonly entityId: string;

  readonly timestamp: Date;

}



/* ==========================================================
 * CREATED EVENT
 * ========================================================== */

export interface UniversalCreatedEvent
  extends UniversalEvent {

  readonly type:
    UniversalEventType.CREATED;

  readonly data: unknown;

}



/* ==========================================================
 * UPDATED EVENT
 * ========================================================== */

export interface UniversalUpdatedEvent
  extends UniversalEvent {

  readonly type:
    UniversalEventType.UPDATED;

  readonly previousData: unknown;

  readonly currentData: unknown;

}



/* ==========================================================
 * DELETED EVENT
 * ========================================================== */

export interface UniversalDeletedEvent
  extends UniversalEvent {

  readonly type:
    UniversalEventType.DELETED;

}



/* ==========================================================
 * RESTORED EVENT
 * ========================================================== */

export interface UniversalRestoredEvent
  extends UniversalEvent {

  readonly type:
    UniversalEventType.RESTORED;

  readonly version: number;

}



/* ==========================================================
 * EVENT UNION
 * ========================================================== */

export type UniversalDomainEvent =
  | UniversalCreatedEvent
  | UniversalUpdatedEvent
  | UniversalDeletedEvent
  | UniversalRestoredEvent;



/* ==========================================================
 * EVENT FACTORY
 * ========================================================== */

export class UniversalEventFactory {



  createId(): string {

    return (
      "evt_" +
      Date.now().toString(36) +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 8)
    );

  }



  createBase(
    type: UniversalEventType,
    entityId: string
  ): UniversalEvent {

    return {

      id: this.createId(),

      type,

      entityId,

      timestamp: new Date(),

    };

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalEventFactory =
  new UniversalEventFactory();
