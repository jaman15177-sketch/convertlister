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
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

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


export abstract class ProductRepository
  extends UniversalRepository<NormalizedProduct> {

  abstract findBySku(
    sku: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;


  abstract findByExternalId(
    externalId: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;


  abstract findProducts(
    filter?: ProductRepositoryFilter
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<NormalizedProduct>[]
    >
  >;

}
