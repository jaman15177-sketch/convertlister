/**
 * ==========================================================
 * SUPABASE PRODUCT CONTRACT
 * ==========================================================
 *
 * Production Repository Contract
 *
 * Responsibilities:
 * - Define Supabase product persistence boundary
 * - Database implementation abstraction
 *
 * Rules:
 * - Contract only
 * - No Supabase client
 * - No business logic
 * - No transformation logic
 * ==========================================================
 */


import type {
  UniversalEntity,
  UniversalStoreResult,
} from "../store/universal.types";


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  SupabaseProductCreateInput,
  SupabaseProductUpdateInput,
  SupabaseProductQuery,
} from "./supabase.product.types";


/**
 * ==========================================================
 * SUPABASE PRODUCT REPOSITORY CONTRACT
 * ==========================================================
 */

export interface SupabaseProductRepositoryContract {


  /**
   * Create product
   */
  create(
    input: SupabaseProductCreateInput
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;



  /**
   * Find by id
   */
  findById(
    id: string,
    organizationId: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;



  /**
   * Find products
   */
  find(
    query?: SupabaseProductQuery
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<NormalizedProduct>[]
    >
  >;



  /**
   * Update product
   */
  update(
    id: string,
    organizationId: string,
    input: SupabaseProductUpdateInput
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;



  /**
   * Upsert product
   */
  upsert(
    input: SupabaseProductCreateInput
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;



  /**
   * Delete product
   */
  delete(
    id: string,
    organizationId: string
  ): Promise<
    UniversalStoreResult<boolean>
  >;



  /**
   * Exists
   */
  exists(
    id: string,
    organizationId: string
  ): Promise<boolean>;



  /**
   * Find by SKU
   */
  findBySku(
    sku: string,
    organizationId: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;



  /**
   * Find by external id
   */
  findByExternalId(
    externalId: string,
    organizationId: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >;

}
