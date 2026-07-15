/**
 * ==========================================================
 * ALIEXPRESS PRODUCT
 * ==========================================================
 *
 * Product detail service for AliExpress.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch single product details
 * • Return raw marketplace product data
 * • Handle product lookup
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize product
 * ✗ Save product
 * ✗ Generate identity
 * ✗ Make winning decision
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressRawProduct,
  AliExpressResponse,
} from "./aliexpress.types";

import {
  AliExpressProductNotFoundError,
} from "./aliexpress.errors";



export interface AliExpressProductQuery {

  productId: string;

}



export class AliExpressProduct {



  /**
   * Get product details
   */
  public async getProduct(
    query: AliExpressProductQuery
  ): Promise<AliExpressRawProduct> {


    if (
      !query.productId ||
      query.productId.trim() === ""
    ) {

      throw new AliExpressProductNotFoundError(
        "Product ID is required."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressRawProduct>
      >(
        `/products/${query.productId}`,
        {
          method: "GET",
        }
      );



    if (
      !response.data
    ) {

      throw new AliExpressProductNotFoundError(
        `Product not found: ${query.productId}`
      );

    }



    return response.data;

  }



  /**
   * Batch product details
   */
  public async getProducts(
    productIds: string[]
  ): Promise<AliExpressRawProduct[]> {


    const products:
      AliExpressRawProduct[] = [];



    for (
      const id of productIds
    ) {


      const product =
        await this.getProduct(
          {
            productId: id,
          }
        );


      products.push(
        product
      );

    }



    return products;

  }


}


export const aliExpressProduct =
  new AliExpressProduct();
