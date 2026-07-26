/**
 * ===========================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT LAYER
 * ===========================================================
 *
 * File:
 * product.snapshot.contract.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Product Snapshot Contracts
 *
 * Layer
 * -----------------------------------------------------------
 * Snapshot → Product Snapshot
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database Implementation
 * ✗ Repository Implementation
 * ✗ Storage Implementation
 * ✗ API
 * ✗ Business Logic
 *
 * ===========================================================
 */

import type {
  ProductSnapshot,
  ProductSnapshotResult,
  ProductSnapshotSearch,
  ProductSnapshotFilter,
} from "./product.snapshot.types";

/* ===========================================================
 * Repository Contract
 * ===========================================================
 */

export interface ProductSnapshotRepositoryContract {

  save(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshot>;

  update(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshot>;

  delete(
    snapshotId: string,
  ): Promise<boolean>;

  findById(
    snapshotId: string,
  ): Promise<ProductSnapshot | null>;

  search(
    search: ProductSnapshotSearch,
    filter: ProductSnapshotFilter,
  ): Promise<readonly ProductSnapshot[]>;

}

/* ===========================================================
 * Database Contract
 * ===========================================================
 */

export interface ProductSnapshotDatabaseContract {

  insert(
    snapshot: ProductSnapshot,
  ): Promise<void>;

  update(
    snapshot: ProductSnapshot,
  ): Promise<void>;

  remove(
    snapshotId: string,
  ): Promise<void>;

  exists(
    snapshotId: string,
  ): Promise<boolean>;

}

/* ===========================================================
 * Service Contract
 * ===========================================================
 */

export interface ProductSnapshotServiceContract {

  createSnapshot(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotResult>;

  updateSnapshot(
    snapshot: ProductSnapshot,
  ): Promise<ProductSnapshotResult>;

  archiveSnapshot(
    snapshotId: string,
  ): Promise<ProductSnapshotResult>;

}

/* ===========================================================
 * Validation Contract
 * ===========================================================
 */

export interface ProductSnapshotValidationContract {

  validate(
    snapshot: ProductSnapshot,
  ): Promise<boolean>;

}

/* ===========================================================
 * Health Contract
 * ===========================================================
 */

export interface ProductSnapshotHealthContract {

  health(): Promise<boolean>;

}
