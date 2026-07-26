/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.search.ts
 *
 * Responsibility:
 * Search contracts, builders and helpers.
 *
 * Layer:
 * Search Domain
 *
 * ===========================================================
 */


import type {
  ReadyProduct,
  MarketplaceType,
  ReadyProductStatus,
} from "./ready-product.types";



/**
 * ===========================================================
 * Search Query
 * ===========================================================
 */

export interface ReadyProductSearchQuery {

  readonly keyword?: string;

  readonly organizationId?: string;

  readonly categoryId?: string;

  readonly marketplace?: MarketplaceType;

  readonly status?: ReadyProductStatus;

}



/**
 * ===========================================================
 * Pagination
 * ===========================================================
 */

export interface ReadyProductSearchPagination {

  readonly page: number;

  readonly limit: number;

}



/**
 * ===========================================================
 * Sorting
 * ===========================================================
 */

export type ReadyProductSearchSortField =
  | "TITLE"
  | "PRICE"
  | "AI_SCORE"
  | "HEALTH_SCORE"
  | "CREATED_AT"
  | "UPDATED_AT";



export type ReadyProductSearchSortDirection =
  | "asc"
  | "desc";



export interface ReadyProductSearchSort {

  readonly field:
    ReadyProductSearchSortField;


  readonly direction:
    ReadyProductSearchSortDirection;

}



/**
 * ===========================================================
 * Search Options
 * ===========================================================
 */

export interface ReadyProductSearchOptions {

  readonly query:
    ReadyProductSearchQuery;


  readonly pagination:
    ReadyProductSearchPagination;


  readonly sort?:
    ReadyProductSearchSort;

}



/**
 * ===========================================================
 * Search Result
 * ===========================================================
 */

export interface ReadyProductSearchResult {

  readonly items:
    readonly ReadyProduct[];


  readonly total:
    number;


  readonly page:
    number;


  readonly limit:
    number;


  readonly hasNextPage:
    boolean;


  readonly hasPreviousPage:
    boolean;

}



/**
 * ===========================================================
 * Defaults
 * ===========================================================
 */

export const DEFAULT_READY_PRODUCT_SEARCH_PAGINATION:
ReadyProductSearchPagination = {

  page: 1,

  limit: 20,

};



/**
 * ===========================================================
 * Builder
 * ===========================================================
 */

export interface ReadyProductSearchBuilderInput {

  readonly query?:
    ReadyProductSearchQuery;


  readonly pagination?:
    ReadyProductSearchPagination;


  readonly sort?:
    ReadyProductSearchSort;

}



export function buildReadyProductSearch(

  input:
    ReadyProductSearchBuilderInput = {},

): ReadyProductSearchOptions {


  return Object.freeze({

    query:
      input.query ?? {},


    pagination:
      input.pagination ??
      DEFAULT_READY_PRODUCT_SEARCH_PAGINATION,


    sort:
      input.sort,

  });

}



/**
 * ===========================================================
 * Provider Contract
 * ===========================================================
 */

export interface ReadyProductSearchProvider {

  search(
    options:
      ReadyProductSearchOptions,

  ):
    Promise<ReadyProductSearchResult>;

}



/**
 * ===========================================================
 * Executor
 * ===========================================================
 */

export async function executeReadyProductSearch(

  provider:
    ReadyProductSearchProvider,

  options:
    ReadyProductSearchOptions,

):
Promise<ReadyProductSearchResult> {


  return provider.search(
    options,
  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function createEmptyReadyProductSearchResult(

  page = 1,

  limit = 20,

):
ReadyProductSearchResult {


  return {

    items: [],

    total: 0,

    page,

    limit,

    hasNextPage: false,

    hasPreviousPage: false,

  };

}



export function hasReadyProductSearchResult(

  result:
    ReadyProductSearchResult,

): boolean {


  return result.items.length > 0;

}



export function getReadyProductSearchCount(

  result:
    ReadyProductSearchResult,

): number {


  return result.total;

}



export function getReadyProductSearchItems(

  result:
    ReadyProductSearchResult,

):
readonly ReadyProduct[] {


  return result.items;

}



/**
 * ===========================================================
 * Validation
 * ===========================================================
 */

export function isReadyProductSearchOptions(

  value:
    unknown,

):
value is ReadyProductSearchOptions {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }


  return true;

}



export function validateReadyProductSearchPagination(

  pagination:
    ReadyProductSearchPagination,

): boolean {


  return (

    pagination.page >= 1 &&

    pagination.limit >= 1

  );

}
