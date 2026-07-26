/**
 * ===========================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT LAYER
 * ===========================================================
 *
 * File:
 * product.snapshot.repository.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Product Snapshot Repository Contract
 *
 * Layer
 * -----------------------------------------------------------
 * Persistence Boundary
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Storage
 * ✗ API
 * ✗ Marketplace
 * ✗ Business Logic
 *
 * ===========================================================
 */

import type {
  ProductSnapshot,
  ProductSnapshotSearch,
  ProductSnapshotFilter,
} from "./product.snapshot.types";

/**
 * Repository Filter
 */
export interface ProductSnapshotRepositoryFilter {

  readonly organizationId: string;

  readonly snapshotId?: string;

  readonly productId?: string;

}

/**
 * Save Result
 */
export interface ProductSnapshotRepositorySaveResult {

  readonly success: boolean;

  readonly snapshot: ProductSnapshot;

}

/**
 * Repository
 */
export interface ProductSnapshotRepository {

  findById(
    snapshotId: string,
  ): Promise<ProductSnapshot | null>;

  findMany(
    filter: ProductSnapshotRepositoryFilter,
  ): Promise<readonly ProductSnapshot[]>;

  save(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotRepositorySaveResult>;

}

/* ===========================================================
 * Update/Delete
 * ===========================================================
 */

export interface ProductSnapshotRepositoryUpdateResult {

  readonly success: boolean;

  readonly snapshot: ProductSnapshot;

}

export interface ProductSnapshotRepositoryDeleteResult {

  readonly success: boolean;

}

export interface ProductSnapshotRepositoryReader {

  exists(
    snapshotId: string,
  ): Promise<boolean>;

}

export interface ProductSnapshotRepositoryWriter {

  update(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotRepositoryUpdateResult>;

  delete(
    snapshotId: string,
  ): Promise<ProductSnapshotRepositoryDeleteResult>;

}

/* ===========================================================
 * Search
 * ===========================================================
 */

export interface ProductSnapshotRepositorySearchResult {

  readonly items:
    readonly ProductSnapshot[];

  readonly total: number;

}

export interface ProductSnapshotRepositorySearch {

  search(
    search: ProductSnapshotSearch,
    filter: ProductSnapshotFilter,
  ): Promise<ProductSnapshotRepositorySearchResult>;

}

/* ===========================================================
 * Health
 * ===========================================================
 */

export interface ProductSnapshotRepositoryHealth {

  readonly healthy: boolean;

  readonly provider: string;

  readonly timestamp: Date;

}

export interface ProductSnapshotRepositoryHealthCheck {

  health():
    Promise<ProductSnapshotRepositoryHealth>;

}

/* ===========================================================
 * Final Provider
 * ===========================================================
 */

export interface ProductSnapshotRepositoryProvider
  extends
    ProductSnapshotRepository,
    ProductSnapshotRepositoryReader,
    ProductSnapshotRepositoryWriter,
    ProductSnapshotRepositorySearch,
    ProductSnapshotRepositoryHealthCheck {}
