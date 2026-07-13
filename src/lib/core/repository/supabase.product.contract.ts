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
  input: SupabaseProductCreateInput
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;

findById(
  id: string,
  organizationId: string
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;


  
find(
  query?: SupabaseProductQuery
): Promise<
  UniversalStoreResult<
    readonly UniversalEntity<AdapterProduct>[]
  >
>;

update(
  id: string,
  organizationId: string,
  input: SupabaseProductUpdateInput
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;
upsert(
  input: SupabaseProductCreateInput
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;

delete(
  id: string,
  organizationId: string
): Promise<
  UniversalStoreResult<boolean>
>;

exists(
  id: string,
  organizationId: string
): Promise<boolean>;

  


  findBySku(
  sku: string,
  organizationId: string
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;

findByExternalId(
  externalId: string,
  organizationId: string
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
>;

}
