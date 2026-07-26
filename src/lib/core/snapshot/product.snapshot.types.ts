/**
 * ===========================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT LAYER
 * ===========================================================
 *
 * File:
 * product.snapshot.types.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Product Snapshot domain models.
 *
 * Layer
 * -----------------------------------------------------------
 * Snapshot → Product Snapshot
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Storage
 * ✗ API
 * ✗ Marketplace
 * ✗ Business Logic
 *
 * ===========================================================
 */

import type {
  ReadyProduct,
} from "../ready-product/ready-product.types";
import type {
  ProductSnapshot as EngineProductSnapshot,
} from "./snapshot.types";
/* ===========================================================
 * Status
 * =========================================================== */

export const PRODUCT_SNAPSHOT_STATUS = {
  CREATED: "CREATED",
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",
} as const;

export type ProductSnapshotStatus =
  (typeof PRODUCT_SNAPSHOT_STATUS)[keyof typeof PRODUCT_SNAPSHOT_STATUS];

/* ===========================================================
 * Identity
 * =========================================================== */

export interface ProductSnapshotIdentity {

  readonly id: string;

  readonly organizationId: string;

  readonly snapshotId: string;

  readonly productId: string;

}

/* ===========================================================
 * Version
 * =========================================================== */

export interface ProductSnapshotVersion {

  readonly version: number;

  readonly revision: number;

}

/* ===========================================================
 * Metadata
 * =========================================================== */

export interface ProductSnapshotMetadata {

  readonly createdBy: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly frozenAt: Date;

}



/* ===========================================================
 * Search
 * =========================================================== */

export interface ProductSnapshotSearch {

  readonly organizationId: string;

  readonly productId?: string;

  readonly snapshotId?: string;

  readonly status?: ProductSnapshotStatus;

}

/* ===========================================================
 * Filter
 * =========================================================== */

export interface ProductSnapshotFilter {

  readonly page: number;

  readonly limit: number;

}

/* ===========================================================
 * Result
 * =========================================================== */

export interface ProductSnapshotResult {

  readonly success: boolean;

  readonly snapshot?: ProductSnapshot;

  readonly error?: string;

}
/**
 * Backward compatible alias
 * Product Snapshot Layer
 */

/* ===========================================================
 * Product Snapshot DTO
 * =========================================================== */

export interface ProductSnapshot
  extends
    ProductSnapshotIdentity,
    ProductSnapshotVersion,
    ProductSnapshotMetadata {

  readonly status: ProductSnapshotStatus;

  readonly product: ReadyProduct;

}
