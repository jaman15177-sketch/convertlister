/**
 * ==========================================================
 * ALIEXPRESS INVENTORY
 * ==========================================================
 *
 * Inventory and stock information service.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Fetch stock information
 * • Handle variant inventory
 * • Provide availability data
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Reserve stock
 * ✗ Update marketplace inventory
 * ✗ Make selling decisions
 * ==========================================================
 */


import {
  aliExpressClient,
} from "./aliexpress.client";

import type {
  AliExpressResponse,
  AliExpressVariant,
} from "./aliexpress.types";

import {
  AliExpressApiError,
} from "./aliexpress.errors";



export interface AliExpressInventoryQuery {

  productId: string;

}



export interface AliExpressInventory {

  productId: string;

  stock: number;

  available: boolean;

  variants:
    AliExpressVariant[];

}



export class AliExpressInventoryService {



  /**
   * Get inventory information
   */
  public async getInventory(
    query: AliExpressInventoryQuery
  ): Promise<AliExpressInventory> {


    if (
      !query.productId
    ) {

      throw new AliExpressApiError(
        "Product ID required for inventory lookup."
      );

    }



    const response =
      await aliExpressClient.request<
        AliExpressResponse<AliExpressInventory>
      >(
        "/inventory",
        {
          method: "GET",

          params: {

            productId:
              query.productId,

          },

        }
      );



    return response.data ?? {

      productId:
        query.productId,

      stock:
        0,

      available:
        false,

      variants:
        [],

    };

  }



  /**
   * Check availability
   */
  public async isAvailable(
    productId: string
  ): Promise<boolean> {


    const inventory =
      await this.getInventory(
        {
          productId,
        }
      );


    return (
      inventory.available &&
      inventory.stock > 0
    );

  }



}


export const aliExpressInventory =
  new AliExpressInventoryService();
