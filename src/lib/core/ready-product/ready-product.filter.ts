/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.filter.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product filtering domain contracts and helpers.
 *
 * Layer:
 * -----------------------------------------------------------
 * Domain
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Engine
 * ✗ API
 *
 * ===========================================================
 */


import type {
  ReadyProduct,
  ReadyProductStatus,
  MarketplaceType,
} from "./ready-product.types";



/**
 * ===========================================================
 * Filter Fields
 * ===========================================================
 */

export const READY_PRODUCT_FILTER_FIELDS = {

  ID: "id",

  TITLE: "title",

  STATUS: "status",

  MARKETPLACE: "marketplace",

  CATEGORY: "category",

  PRICE: "price",

  AI_SCORE: "aiScore",

  HEALTH_SCORE: "healthScore",

  CREATED_AT: "createdAt",

  UPDATED_AT: "updatedAt",

} as const;



export type ReadyProductFilterField =
  typeof READY_PRODUCT_FILTER_FIELDS[
    keyof typeof READY_PRODUCT_FILTER_FIELDS
  ];



/**
 * ===========================================================
 * Filter Operators
 * ===========================================================
 */

export const READY_PRODUCT_FILTER_OPERATORS = {

  EQ: "eq",

  NOT_EQ: "notEq",

  GT: "gt",

  GTE: "gte",

  LT: "lt",

  LTE: "lte",

  CONTAINS: "contains",

  STARTS_WITH: "startsWith",

  ENDS_WITH: "endsWith",

  IN: "in",

} as const;



export type ReadyProductFilterOperator =
  typeof READY_PRODUCT_FILTER_OPERATORS[
    keyof typeof READY_PRODUCT_FILTER_OPERATORS
  ];



/**
 * ===========================================================
 * Filter Condition
 * ===========================================================
 */

export interface ReadyProductFilterCondition<
  TValue = unknown,
> {

  readonly field:
    ReadyProductFilterField;


  readonly operator:
    ReadyProductFilterOperator;


  readonly value:
    TValue;

}



/**
 * ===========================================================
 * Filter Group
 * ===========================================================
 */

export interface ReadyProductFilterGroup {

  readonly conditions:
    readonly ReadyProductFilterCondition[];


  readonly match:
    "AND" | "OR";

}



/**
 * ===========================================================
 * Main Filter Contract
 * ===========================================================
 */

export interface ReadyProductFilter {


  readonly organizationId?: string;


  readonly status?:
    ReadyProductStatus;


  readonly marketplace?:
    MarketplaceType;


  readonly categoryId?:
    string;


  readonly minimumPrice?:
    number;


  readonly maximumPrice?:
    number;


  readonly minimumAiScore?:
    number;


  readonly minimumHealthScore?:
    number;


  readonly keyword?:
    string;


  readonly group?:
    ReadyProductFilterGroup;


  readonly page?:
    number;


  readonly limit?:
    number;


}



/**
 * ===========================================================
 * Match Result
 * ===========================================================
 */

export interface ReadyProductMatchResult {

  readonly matched:
    boolean;


  readonly reason?:
    string;

}



/**
 * ===========================================================
 * Pagination Result
 * ===========================================================
 */

export interface ReadyProductPaginationResult {


  readonly items:
    readonly ReadyProduct[];


  readonly total:
    number;


  readonly page:
    number;


  readonly limit:
    number;

}



/**
 * ===========================================================
 * Filter Functions
 * ===========================================================
 */


/**
 * Filter By Status
 */
export function filterReadyProductsByStatus(
  products: readonly ReadyProduct[],
  status: ReadyProductStatus,
): readonly ReadyProduct[] {


  return products.filter(

    (product) =>
      product.status === status,

  );

}



/**
 * Filter By Marketplace
 */
export function filterReadyProductsByMarketplace(
  products: readonly ReadyProduct[],
  marketplace: MarketplaceType,
): readonly ReadyProduct[] {


  return products.filter(

    (product) =>
     product.marketplace === marketplace

  );

}



/**
 * Filter By Organization
 */
export function filterReadyProductsByOrganization(
  products: readonly ReadyProduct[],
  organizationId: string,
): readonly ReadyProduct[] {


  return products.filter(

    (product) =>
      product.organization_id === organizationId

  );

}



/**
 * Filter By Snapshot
 */
export function filterReadyProductsBySnapshot(
  products: readonly ReadyProduct[],
  snapshotId: string,
): readonly ReadyProduct[] {


  return products.filter(

    (product) =>
      product.snapshot_id === snapshotId

  );

}



/**
 * ===========================================================
 * Pagination
 * ===========================================================
 */

export function paginateReadyProducts(
  products: readonly ReadyProduct[],
  page = 1,
  limit = 20,
): ReadyProductPaginationResult {


  const safePage =
    Math.max(1, page);


  const safeLimit =
    Math.max(1, limit);



  const start =
    (safePage - 1) * safeLimit;



  return {


    items:
      products.slice(
        start,
        start + safeLimit,
      ),


    total:
      products.length,


    page:
      safePage,


    limit:
      safeLimit,

  };

}



/**
 * ===========================================================
 * Default Filter
 * ===========================================================
 */

export function createDefaultReadyProductFilter():

ReadyProductFilter {


  return {

    page: 1,

    limit: 20,

  };

}



/**
 * ===========================================================
 * Merge Filter
 * ===========================================================
 */

export function mergeReadyProductFilter(

  base: ReadyProductFilter,

  override: Partial<ReadyProductFilter>,

): ReadyProductFilter {


  return {

    ...base,

    ...override,

  };

}



/**
 * ===========================================================
 * Runtime Guard
 * ===========================================================
 */

export function isReadyProductFilter(

  value: unknown,

): value is ReadyProductFilter {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }


  return true;

}



/**
 * ===========================================================
 * Normalize Filter
 * ===========================================================
 */

export function normalizeReadyProductFilter(

  filter: Partial<ReadyProductFilter>,

): ReadyProductFilter {


  return mergeReadyProductFilter(

    createDefaultReadyProductFilter(),

    filter,

  );

}
