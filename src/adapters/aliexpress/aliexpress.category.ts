/**
 * ==========================================================
 * ALIEXPRESS CATEGORY
 * ==========================================================
 *
 * Category information service.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch category information
 * • Resolve category hierarchy
 * • Provide marketplace category data
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize category
 * ✗ Map Universal Store category
 * ✗ Make business decisions
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressResponse,
} from "./aliexpress.types";

import {
  AliExpressApiError,
} from "./aliexpress.errors";



export interface AliExpressCategory {

  id: string;

  name: string;

  parentId?: string;

  children?: AliExpressCategory[];

}



export interface AliExpressCategoryQuery {

  categoryId: string;

}



export class AliExpressCategoryService {



  /**
   * Get category details
   */
  public async getCategory(
    query: AliExpressCategoryQuery
  ): Promise<AliExpressCategory> {


    if (
      !query.categoryId
    ) {

      throw new AliExpressApiError(
        "Category ID required."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressCategory>
      >(
        "/category",
        {
          method: "GET",

          params: {

            categoryId:
              query.categoryId,

          },

        }
      );



    return response.data ?? {

      id:
        query.categoryId,

      name:
        "Unknown Category",

      parentId:
        undefined,

      children:
        [],

    };

  }



  /**
   * Get category tree
   */
  public async getTree(
    categoryId: string
  ): Promise<AliExpressCategory> {


    return this.getCategory(
      {
        categoryId,
      }
    );

  }


}



export const aliExpressCategory =
  new AliExpressCategoryService();
