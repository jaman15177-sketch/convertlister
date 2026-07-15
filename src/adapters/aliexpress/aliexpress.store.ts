/**
 * ==========================================================
 * ALIEXPRESS STORE
 * ==========================================================
 *
 * Store/Seller information service.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch seller information
 * • Collect store rating
 * • Collect seller metadata
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Calculate trust score
 * ✗ Make winning decision
 * ✗ Save product
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressStore,
  AliExpressResponse,
} from "./aliexpress.types";

import {
  AliExpressApiError,
} from "./aliexpress.errors";



export interface AliExpressStoreQuery {

  storeId: string;

}



export class AliExpressStoreService {



  /**
   * Get store information
   */
  public async getStore(
    query: AliExpressStoreQuery
  ): Promise<AliExpressStore> {


    if (
      !query.storeId
    ) {

      throw new AliExpressApiError(
        "Store ID required."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressStore>
      >(
        "/store",
        {
          method: "GET",

          params: {

            storeId:
              query.storeId,

          },

        }
      );



    return response.data ?? {

      id:
        query.storeId,

      name:
        "Unknown Store",

      rating:
        0,

      totalProducts:
        0,

    };

  }



  /**
   * Get store rating
   */
  public async getRating(
    storeId: string
  ): Promise<number> {


    const store =
      await this.getStore(
        {
          storeId,
        }
      );


    return store.rating ?? 0;

  }


}



export const aliExpressStore =
  new AliExpressStoreService();
