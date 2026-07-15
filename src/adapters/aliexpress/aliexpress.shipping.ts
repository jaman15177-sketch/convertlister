/**
 * ==========================================================
 * ALIEXPRESS SHIPPING
 * ==========================================================
 *
 * Shipping information service.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch shipping information
 * • Return delivery cost and estimate
 * • Provide shipping availability
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Calculate profit
 * ✗ Make winning decision
 * ✗ Save product data
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressShipping,
  AliExpressResponse,
} from "./aliexpress.types";

import {
  AliExpressApiError,
} from "./aliexpress.errors";



export interface AliExpressShippingQuery {

  productId: string;

  country?: string;

}



export class AliExpressShippingService {



  /**
   * Get shipping information
   */
  public async getShipping(
    query: AliExpressShippingQuery
  ): Promise<AliExpressShipping> {


    if (
      !query.productId
    ) {

      throw new AliExpressApiError(
        "Product ID required for shipping lookup."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressShipping>
      >(
        "/shipping",
        {
          method: "GET",

          params: {

            productId:
              query.productId,

            country:
              query.country ?? "US",

          },

        }
      );



    return response.data ?? {

      available: false,

      cost: 0,

      currency: "USD",

      deliveryTime:
        "Unknown",

    };

  }



  /**
   * Check shipping availability
   */
  public async isAvailable(
    query: AliExpressShippingQuery
  ): Promise<boolean> {


    const shipping =
      await this.getShipping(
        query
      );


    return Boolean(
      shipping.available
    );

  }


}


export const aliExpressShipping =
  new AliExpressShippingService();
