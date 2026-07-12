/**
 * ==========================================================
 * REPOSITORY TYPES
 * ==========================================================
 *
 * Shared repository layer types.
 *
 * Responsibilities:
 * - Repository operation types
 * - Pagination models
 * - Query options
 * - Result contracts
 *
 * Rules:
 * - Types only
 * - No business logic
 * - No database dependency
 * ==========================================================
 */


/* ==========================================================
 * PAGINATION
 * ========================================================== */

export interface RepositoryPagination {

  readonly page: number;

  readonly limit: number;

}



/* ==========================================================
 * SORTING
 * ========================================================== */

export type RepositorySortOrder =
  | "asc"
  | "desc";


export interface RepositorySort {

  readonly field: string;

  readonly order:
    RepositorySortOrder;

}



/* ==========================================================
 * QUERY OPTIONS
 * ========================================================== */

export interface RepositoryOptions {

  readonly pagination?:
    RepositoryPagination;


  readonly sort?:
    RepositorySort;


  readonly includeDeleted?:
    boolean;

}



/* ==========================================================
 * FILTER
 * ========================================================== */

export type RepositoryFilterValue =
  string |
  number |
  boolean |
  null;


export type RepositoryFilter =
  Record<
    string,
    RepositoryFilterValue
  >;



/* ==========================================================
 * REPOSITORY RESPONSE
 * ========================================================== */

export interface RepositoryResponse<T> {

  readonly success: boolean;

  readonly data?: T;

  readonly error?: string;

}



/* ==========================================================
 * BULK OPERATION RESULT
 * ========================================================== */

export interface RepositoryBulkResult<T> {

  readonly total: number;

  readonly successful: number;

  readonly failed: number;

  readonly items:
    readonly T[];

}
