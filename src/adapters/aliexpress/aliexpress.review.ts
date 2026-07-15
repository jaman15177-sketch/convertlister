/**
 * ==========================================================
 * ALIEXPRESS REVIEW
 * ==========================================================
 *
 * Review and rating service.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch product reviews metadata
 * • Collect rating information
 * • Provide customer feedback signals
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Calculate winning score
 * ✗ Optimize product
 * ✗ Save data
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressReview,
  AliExpressResponse,
} from "./aliexpress.types";

import {
  AliExpressApiError,
} from "./aliexpress.errors";



export interface AliExpressReviewQuery {

  productId: string;

}



export class AliExpressReviewService {


  /**
   * Get product reviews
   */
  public async getReviews(
    query: AliExpressReviewQuery
  ): Promise<AliExpressReview> {


    if (
      !query.productId
    ) {

      throw new AliExpressApiError(
        "Product ID required for reviews."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressReview>
      >(
        "/reviews",
        {
          method: "GET",

          params: {

            productId:
              query.productId,

          },

        }
      );



    return response.data ?? {

      count: 0,

      rating: 0,

    };

  }



  /**
   * Get rating only
   */
  public async getRating(
    productId: string
  ): Promise<number> {


    const review =
      await this.getReviews(
        {
          productId,
        }
      );


    return review.rating ?? 0;

  }



}


export const aliExpressReview =
  new AliExpressReviewService();
