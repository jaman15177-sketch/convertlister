/**
 * ==========================================================
 * PRODUCT REPOSITORY TYPES
 * ==========================================================
 *
 * Product repository specific types.
 *
 * Responsibilities:
 * - Product query filters
 * - Product search parameters
 * - Product repository options
 *
 * Rules:
 * - Types only
 * - No business logic
 * - No database dependency
 * ==========================================================
 */


/* ==========================================================
 * PRODUCT FILTER
 * ========================================================== */

export interface ProductRepositoryFilter {

  /**
   * Organization tenant scope
   */
  readonly organizationId?: string;


  /**
   * Marketplace source
   */
  readonly source?: string;


  /**
   * Product brand
   */
  readonly brand?: string;


  /**
   * Category
   */
  readonly category?: string;


  /**
   * Product status
   */
  readonly status?: string;


  /**
   * External marketplace id
   */
  readonly externalId?: string;


  /**
   * SKU
   */
  readonly sku?: string;

}



/* ==========================================================
 * PRODUCT QUERY OPTIONS
 * ========================================================== */

export interface ProductRepositoryQuery {

  readonly filter?:
    ProductRepositoryFilter;


  readonly limit?: number;


  readonly offset?: number;


  readonly sortBy?: string;


  readonly sortOrder?:
    "asc" | "desc";

}



/* ==========================================================
 * PRODUCT BULK OPERATION
 * ========================================================== */

export interface ProductBulkOperationResult {

  readonly inserted: number;

  readonly updated: number;

  readonly skipped: number;

  readonly failed: number;

}
