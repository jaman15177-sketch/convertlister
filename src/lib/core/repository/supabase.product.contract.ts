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
  UniversalQuery,
  UniversalStoreResult,
} from "../store/universal.types";


import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";


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
    input:
      SupabaseProductCreateInput
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;



  /**
   * Find product by id
   */
  findById(
    id: string
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;



  /**
   * Find products
   */
  find(
    query?:
      SupabaseProductQuery
  ):
    Promise<
      UniversalStoreResult<
        readonly UniversalEntity<AdapterProduct>[]
      >
    >;



    /**
   * Update product
   */
  update(
    id: string,
    input: SupabaseProductUpdateInput
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;


  /**
   * Create or update product
   */
  upsert(
    input:
      SupabaseProductCreateInput
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;



  /**
   * Delete product
   */
  delete(
    id: string
  ):
    Promise<
      UniversalStoreResult<boolean>
    >;



  /**
   * Check existence
   */
  exists(
    id: string
  ):
    Promise<boolean>;



  /**
   * Find by SKU
   */
  findBySku(
    sku: string
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;



  /**
   * Find by external marketplace ID
   */
  findByExternalId(
    externalId: string
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<AdapterProduct>
      >
    >;


}
