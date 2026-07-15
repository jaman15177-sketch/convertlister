/**
 * ==========================================================
 * ALIEXPRESS PARSER
 * ==========================================================
 *
 * Parses external AliExpress response data.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Convert unknown JSON safely
 * • Extract product structure
 * • Protect adapter pipeline
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize product
 * ✗ Map Universal Store
 * ✗ Save database
 * ✗ Make business decisions
 * ==========================================================
 */


import type {
  AliExpressRawProduct,
} from "./aliexpress.types";

import {
  AliExpressResponseError,
} from "./aliexpress.errors";



export class AliExpressParser {



  /**
   * Parse single product response
   */
  public parseProduct(
    raw: unknown
  ): AliExpressRawProduct {


    if (
      !raw ||
      typeof raw !== "object"
    ) {

      throw new AliExpressResponseError(
        "Invalid AliExpress product response."
      );

    }



    const data =
      raw as Record<string, unknown>;



    return {

      id:
        String(
          data.id ?? ""
        ),


      title:
        this.stringValue(
          data.title
        ),


      description:
        this.stringValue(
          data.description
        ),


      images:
        this.arrayValue(
          data.images
        ),


      category:
        this.stringValue(
          data.category
        ),


      price:
        this.numberValue(
          data.price
        ),


      currency:
        this.stringValue(
          data.currency
        ),


      discount:
        this.numberValue(
          data.discount
        ),


      shippingCost:
        this.numberValue(
          data.shippingCost
        ),


      reviewCount:
        this.numberValue(
          data.reviewCount
        ),


      rating:
        this.numberValue(
          data.rating
        ),


      orders:
        this.numberValue(
          data.orders
        ),


      storeName:
        this.stringValue(
          data.storeName
        ),


      brand:
        this.stringValue(
          data.brand
        ),


      stock:
        this.numberValue(
          data.stock
        ),


      tags:
        this.arrayValue(
          data.tags
        ),

      url:
        this.stringValue(
          data.url
        ),

      region:
        this.stringValue(
          data.region
        ),

      metadata:
        data.metadata as Record<string, unknown>,

    };

  }



  /**
   * Parse multiple products
   */
  public parseMany(
    products: unknown[]
  ): AliExpressRawProduct[] {


    return products.map(
      product =>
        this.parseProduct(product)
    );

  }



  private stringValue(
    value: unknown
  ): string | undefined {


    return typeof value === "string"
      ? value
      : undefined;

  }



  private numberValue(
    value: unknown
  ): number | undefined {


    return typeof value === "number"
      ? value
      : undefined;

  }



  private arrayValue(
    value: unknown
  ): string[] {


    return Array.isArray(value)
      ? value.filter(
          item =>
            typeof item === "string"
        )
      : [];

  }


}



export const aliExpressParser =
  new AliExpressParser();
