/**
 * ============================================================
 * CONVERTLISTER
 * PRODUCT SNAPSHOT ADAPTER
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Converts Snapshot Engine Model
 * to Product Snapshot DTO.
 *
 * Snapshot Engine
 *        ↓
 * Product Snapshot DTO
 *
 * ============================================================
 */

import type {
  ProductSnapshot as EngineProductSnapshot,
} from "./snapshot.types";

import type {
  ProductSnapshot,
} from "./product.snapshot.types";

import type {
  ReadyProduct,
} from "../ready-product/ready-product.types";

import {
  PRODUCT_SNAPSHOT_STATUS,
} from "./product.snapshot.types";

export function adaptEngineSnapshotToProductSnapshot(
  input: EngineProductSnapshot,
): ProductSnapshot {

  return {

    id:
      input.identity.snapshotId,

    organizationId:
      input.identity.organizationId,

    snapshotId:
      input.identity.snapshotId,

    productId:
      input.identity.productId,

    version:
      input.metadata.version,

    revision:
      1,

    createdBy:
      input.metadata.createdBy,

    createdAt:
      input.metadata.createdAt,

    updatedAt:
      input.metadata.createdAt,

    frozenAt:
      input.metadata.createdAt,

    status:
      PRODUCT_SNAPSHOT_STATUS.CREATED,

    product:
      input.payload as ReadyProduct,

  };

}
