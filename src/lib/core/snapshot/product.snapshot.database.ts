/**
 * ===========================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT LAYER
 * ===========================================================
 *
 * File:
 * product.snapshot.database.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Product Snapshot Database Contract
 *
 * Layer
 * -----------------------------------------------------------
 * Database Boundary
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Supabase
 * ✗ SQL
 * ✗ Prisma
 * ✗ Repository Logic
 * ✗ Business Logic
 * ✗ API
 *
 * ===========================================================
 */

import type {
  ProductSnapshot,
} from "./product.snapshot.types";

/**
 * Database Save Result
 */
export interface ProductSnapshotDatabaseSaveResult {

  readonly success: boolean;

  readonly snapshotId: string;

}

/**
 * Database Update Result
 */
export interface ProductSnapshotDatabaseUpdateResult {

  readonly success: boolean;

}

/**
 * Database Delete Result
 */
export interface ProductSnapshotDatabaseDeleteResult {

  readonly success: boolean;

}

/**
 * Database Query
 */
export interface ProductSnapshotDatabaseQuery {

  readonly organizationId: string;

  readonly snapshotId?: string;

  readonly productId?: string;

}

/**
 * Database Reader
 */
export interface ProductSnapshotDatabaseReader {

  findById(
    snapshotId: string,
  ): Promise<ProductSnapshot | null>;

  findMany(
    query: ProductSnapshotDatabaseQuery,
  ): Promise<readonly ProductSnapshot[]>;

  exists(
    snapshotId: string,
  ): Promise<boolean>;

}

/**
 * Database Writer
 */
export interface ProductSnapshotDatabaseWriter {

  insert(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotDatabaseSaveResult>;

  update(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotDatabaseUpdateResult>;

  delete(
    snapshotId: string,
  ): Promise<ProductSnapshotDatabaseDeleteResult>;

}

/**
 * Database Health
 */
export interface ProductSnapshotDatabaseHealth {

  readonly healthy: boolean;

  readonly provider: string;

  readonly timestamp: Date;

}

/**
 * Database Health Contract
 */
export interface ProductSnapshotDatabaseHealthCheck {

  health():
    Promise<ProductSnapshotDatabaseHealth>;

}

/**
 * Final Database Provider
 */
export interface ProductSnapshotDatabaseProvider
  extends
    ProductSnapshotDatabaseReader,
    ProductSnapshotDatabaseWriter,
    ProductSnapshotDatabaseHealthCheck {}
