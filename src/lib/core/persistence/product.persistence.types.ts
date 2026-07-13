/**
 * ==========================================================
 * PRODUCT PERSISTENCE TYPES
 * ==========================================================
 *
 * Enterprise Product Persistence Types
 *
 * Responsibilities:
 * - Persistence request types
 * - Persistence result types
 * - Batch operation types
 * - Metrics types
 *
 * Rules:
 * - No business logic
 * - No persistence logic
 * - Shared across persistence subsystem
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  UniversalEntity,
} from "../store/universal.types";

/* ==========================================================
 * PERSISTENCE MODE
 * ==========================================================
 */

export type PersistenceMode =
  | "create"
  | "update"
  | "upsert";

/* ==========================================================
 * SINGLE REQUEST
 * ==========================================================
 */

export interface ProductPersistenceRequest {

  readonly organizationId: string;

  readonly entity:
    UniversalEntity<AdapterProduct>;

  readonly mode:
    PersistenceMode;

}

/* ==========================================================
 * BATCH REQUEST
 * ==========================================================
 */

export interface ProductBatchPersistenceRequest {

  readonly organizationId: string;

  readonly entities:
    readonly UniversalEntity<AdapterProduct>[];

  readonly mode:
    PersistenceMode;

}

/* ==========================================================
 * SINGLE RESULT
 * ==========================================================
 */

export interface ProductPersistenceResult {

  readonly success: boolean;

  readonly id: string;

  readonly created: boolean;

  readonly updated: boolean;

  readonly skipped: boolean;

  readonly message?: string;

}

/* ==========================================================
 * BATCH RESULT
 * ==========================================================
 */

export interface ProductBatchPersistenceResult {

  readonly success: boolean;

  readonly total: number;

  readonly inserted: number;

  readonly updated: number;

  readonly skipped: number;

  readonly failed: number;

  readonly results:
    readonly ProductPersistenceResult[];

}

/* ==========================================================
 * PERSISTENCE METRICS
 * ==========================================================
 */

export interface ProductPersistenceMetrics {

  readonly processed: number;

  readonly inserted: number;

  readonly updated: number;

  readonly skipped: number;

  readonly failed: number;

  readonly durationMs: number;

}

/* ==========================================================
 * TRANSACTION RESULT
 * ==========================================================
 */

export interface ProductPersistenceTransactionResult {

  readonly success: boolean;

  readonly committed: boolean;

  readonly rolledBack: boolean;

  readonly message?: string;

}
