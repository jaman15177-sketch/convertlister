/**
 * ==========================================================
 * PRODUCT REPOSITORY
 * ==========================================================
 *
 * Product repository contract.
 *
 * Responsibilities
 * - Product-specific repository operations
 * - Extend UniversalRepository
 *
 * Rules
 * - No storage implementation
 * - No business logic
 * - No infrastructure
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  UniversalEntity,
  UniversalStoreResult,
} from "../store/universal.types";

import {
  UniversalRepository,
} from "./universal.repository";

import type {
  ProductRepositoryFilter,
} from "./product.repository.types";

/* ==========================================================
 * PRODUCT REPOSITORY
 * ========================================================== */

export abstract class ProductRepository
  extends UniversalRepository<AdapterProduct> {

  /**
   * Find by SKU
   */
  abstract findBySku(
    sku: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  >;

  /**
   * Find by external marketplace id
   */
  abstract findByExternalId(
    externalId: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  >;

  /**
   * Product search
   */
  abstract findProducts(
    filter?: ProductRepositoryFilter
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<AdapterProduct>[]
    >
  >;

}
