/**
 * ============================================================
 * CONVERTLISTER
 * ALIEXPRESS PAGINATION
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Normalize page parameters
 * • Calculate next/previous page
 * • Validate pagination values
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute HTTP requests
 * ✗ Parse API responses
 * ✗ Contain business logic
 * ============================================================
 */

export interface PaginationInput {

  readonly page?: number;

  readonly limit?: number;

}

export interface PaginationResult {

  readonly page: number;

  readonly limit: number;

  readonly offset: number;

}

export interface PaginationMeta {

  readonly page: number;

  readonly limit: number;

  readonly total: number;

  readonly totalPages: number;

  readonly hasPrevious: boolean;

  readonly hasNext: boolean;

  readonly previousPage: number | null;

  readonly nextPage: number | null;

}

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 20;

const MAX_LIMIT = 100;

export class AliExpressPagination {

  /**
   * Normalize pagination values.
   */
  public normalize(
    input: PaginationInput
  ): PaginationResult {

    const page =
      Math.max(
        DEFAULT_PAGE,
        Math.floor(input.page ?? DEFAULT_PAGE)
      );

    const limit =
      Math.min(
        MAX_LIMIT,
        Math.max(
          1,
          Math.floor(input.limit ?? DEFAULT_LIMIT)
        )
      );

    return {

      page,

      limit,

      offset:
        (page - 1) * limit,

    };

  }

  /**
   * Build pagination metadata.
   */
  public buildMeta(

    page: number,

    limit: number,

    total: number

  ): PaginationMeta {

    const totalPages =
      Math.max(
        1,
        Math.ceil(total / limit)
      );

    return {

      page,

      limit,

      total,

      totalPages,

      hasPrevious:
        page > 1,

      hasNext:
        page < totalPages,

      previousPage:
        page > 1
          ? page - 1
          : null,

      nextPage:
        page < totalPages
          ? page + 1
          : null,

    };

  }

}

export const aliExpressPagination =
  new AliExpressPagination();
