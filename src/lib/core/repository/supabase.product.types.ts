/**
 * ==========================================================
 * SUPABASE PRODUCT TYPES
 * ==========================================================
 *
 * Supabase persistence types.
 *
 * Responsibilities:
 * - Database row contracts
 * - Create input types
 * - Update input types
 * - Query types
 *
 * Rules:
 * - Types only
 * - No business logic
 * - No repository logic
 * ==========================================================
 */


/* ==========================================================
 * PRODUCT STATUS
 * ==========================================================
 */

export type ProductStatus =
  | "raw"
  | "validated"
  | "winning"
  | "optimized"
  | "ready"
  | "published"
  | "rejected";


/* ==========================================================
 * SUPABASE PRODUCT ROW
 * ==========================================================
 */

export interface SupabaseProductRow {

  id: string;

  organization_id: string;

  title: string;

  description?: string | null;

  price: number;

  currency: string;

  source: string;

  status: ProductStatus;

  catalog_health_score?: number | null;

  catalog_health_grade?: string | null;

  winning_score?: number | null;

  is_ready: boolean;

  current_version: number;

  metadata?: Record<
    string,
    unknown
  > | null;

  created_at: string;

  updated_at: string;

}


/* ==========================================================
 * CREATE PRODUCT INPUT
 * ==========================================================
 */

export interface SupabaseProductCreateInput {

  organization_id: string;

  title: string;

  description?: string | null;

  price: number;

  currency: string;

  source: string;

  status?: ProductStatus;

  metadata?: Record<
    string,
    unknown
  >;

}


/* ==========================================================
 * UPDATE PRODUCT INPUT
 * ==========================================================
 */

export interface SupabaseProductUpdateInput {

  title?: string;

  description?: string | null;

  price?: number;

  currency?: string;

  status?: ProductStatus;

  catalog_health_score?: number;

  catalog_health_grade?: string;

  winning_score?: number;

  is_ready?: boolean;

  current_version?: number;

  metadata?: Record<
    string,
    unknown
  >;

}


/* ==========================================================
 * PRODUCT QUERY
 * ==========================================================
 */

export interface SupabaseProductQuery {

  organization_id?: string;

  status?: ProductStatus;

  is_ready?: boolean;

  limit?: number;

}
