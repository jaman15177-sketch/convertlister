/**
 * ==========================================================
 * ALIEXPRESS VALIDATOR
 * ==========================================================
 *
 * Validates AliExpress raw product data.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Check required fields
 * • Detect invalid marketplace data
 * • Protect downstream pipeline
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize data
 * ✗ Modify product
 * ✗ Save data
 * ✗ Make winning decision
 * ==========================================================
 */


import type {
  AliExpressRawProduct,
} from "./aliexpress.types";

import {
  AliExpressResponseError,
} from "./aliexpress.errors";



export class AliExpressValidator {



  /**
   * Validate single product
   */
  public validate(
    product: AliExpressRawProduct
  ): void {


    if (
      !product
    ) {

      throw new AliExpressResponseError(
        "AliExpress product is empty."
      );

    }



    if (
      !product.id ||
      product.id.trim() === ""
    ) {

      throw new AliExpressResponseError(
        "Product ID is required."
      );

    }



    if (
      !product.title ||
      product.title.trim() === ""
    ) {

      throw new AliExpressResponseError(
        "Product title is required."
      );

    }



    if (
      product.price !== undefined &&
      product.price < 0
    ) {

      throw new AliExpressResponseError(
        "Product price cannot be negative."
      );

    }


  }



  /**
   * Validate multiple products
   */
  public validateMany(
    products: AliExpressRawProduct[]
  ): void {


    if (
      !Array.isArray(products)
    ) {

      throw new AliExpressResponseError(
        "Products must be an array."
      );

    }



    products.forEach(
      product =>
        this.validate(product)
    );


  }



}



export const aliExpressValidator =
  new AliExpressValidator();
