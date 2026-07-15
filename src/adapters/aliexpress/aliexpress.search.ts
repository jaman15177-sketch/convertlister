/**
 * ==========================================================
 * ALIEXPRESS SEARCH
 * ==========================================================
 *
 * Product search service for AliExpress.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Search products
 * • Handle pagination
 * • Return raw marketplace products
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize products
 * ✗ Save to Universal Store
 * ✗ Make winning decision
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressSearchQuery,
  AliExpressRawProduct,
  AliExpressResponse,
} from "./aliexpress.types";

import {
  ALIEXPRESS_PAGINATION,
} from "./aliexpress.constants";



export class AliExpressSearch {



  /**
   * Search products
   */
  public async search(
    query: AliExpressSearchQuery
  ): Promise<AliExpressRawProduct[]> {


    const payload =
      this.prepareQuery(query);



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressRawProduct[]>
      >(
        "/products/search",
        {
          method: "GET",
          params: payload,
        }
      );



    return response.data ?? [];

  }



  /**
   * Normalize search query
   */
  private prepareQuery(
    query: AliExpressSearchQuery
  ): Record<string, unknown> {


    return {

      keyword:
        query.keyword.trim(),

      page:
        query.page ??
        ALIEXPRESS_PAGINATION.DEFAULT_PAGE,

      limit:
        Math.min(
          query.limit ??
          ALIEXPRESS_PAGINATION.DEFAULT_LIMIT,

          ALIEXPRESS_PAGINATION.MAX_LIMIT
        ),

      categoryId:
        query.categoryId,

    };

  }


}


export const aliExpressSearch =
  new AliExpressSearch();
