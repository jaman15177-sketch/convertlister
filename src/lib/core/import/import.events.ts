/**
 * ==========================================================
 * IMPORT EVENTS
 * ==========================================================
 *
 * Domain events for Import subsystem.
 *
 * Responsibilities:
 * - Event definitions only
 * - Strong typing
 * - Domain communication contract
 *
 * Rules:
 * - No event bus
 * - No queue
 * - No database
 * - No infrastructure
 * ==========================================================
 */

import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import type { ImportSource } from "./import.types";


/* ==========================================================
 * EVENT TYPES
 * ==========================================================
 */

export enum ImportEventType {

  STARTED = "IMPORT_STARTED",

  PRODUCT_IMPORTED = "PRODUCT_IMPORTED",

  PRODUCT_SKIPPED = "PRODUCT_SKIPPED",

  PRODUCT_FAILED = "PRODUCT_FAILED",

  COMPLETED = "IMPORT_COMPLETED",

  FAILED = "IMPORT_FAILED",

  CANCELLED = "IMPORT_CANCELLED",
}


/* ==========================================================
 * BASE EVENT
 * ==========================================================
 */

export interface ImportEventBase {

  readonly id: string;

  readonly type: ImportEventType;

  readonly timestamp: Date;

  readonly source: ImportSource;

  readonly jobId: string;
}


/* ==========================================================
 * STARTED EVENT
 * ==========================================================
 */

export interface ImportStartedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.STARTED;

  readonly totalProducts: number;
}


/* ==========================================================
 * PRODUCT IMPORTED
 * ==========================================================
 */

export interface ProductImportedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.PRODUCT_IMPORTED;

  readonly product: AdapterProduct;
}


/* ==========================================================
 * PRODUCT SKIPPED
 * ==========================================================
 */

export interface ProductSkippedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.PRODUCT_SKIPPED;

  readonly reason: string;

  readonly productId?: string;
}


/* ==========================================================
 * PRODUCT FAILED
 * ==========================================================
 */

export interface ProductFailedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.PRODUCT_FAILED;

  readonly message: string;

  readonly productId?: string;
}


/* ==========================================================
 * COMPLETED EVENT
 * ==========================================================
 */

export interface ImportCompletedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.COMPLETED;

  readonly imported: number;

  readonly failed: number;

  readonly skipped: number;

  readonly duplicated: number;

  readonly durationMs: number;
}


/* ==========================================================
 * FAILED EVENT
 * ==========================================================
 */

export interface ImportFailedEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.FAILED;

  readonly message: string;
}


/* ==========================================================
 * CANCELLED EVENT
 * ==========================================================
 */

export interface ImportCancelledEvent
  extends ImportEventBase {

  readonly type:
    ImportEventType.CANCELLED;

  readonly reason?: string;
}


/* ==========================================================
 * DOMAIN EVENT UNION
 * ==========================================================
 */

export type ImportDomainEvent =
  | ImportStartedEvent
  | ProductImportedEvent
  | ProductSkippedEvent
  | ProductFailedEvent
  | ImportCompletedEvent
  | ImportFailedEvent
  | ImportCancelledEvent;
