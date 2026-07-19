/**
 * ============================================================
 * CONVERTLISTER
 * PRODUCT VALIDATOR
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Validate normalized product
 * • Ensure required fields exist
 * • Protect downstream pipeline
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Approve products
 * ✗ Calculate winning score
 * ✗ Save database
 * ============================================================
 */


import type {
  NormalizedProduct,
} from "./normalizer.types";


import {
  MissingFieldError,
} from "./normalizer.errors";



export class ProductValidator {



  /**
   * Validate normalized product
   */
  public validate(
    product: NormalizedProduct
  ): true {


    this.required(
      product.id,
      "id"
    );


    this.required(
      product.source,
      "source"
    );
this.required(
  product.marketplace,
  "marketplace"
);

    this.required(
      product.title,
      "title"
    );


        if (
      !product.price ||
      typeof product.price.amount !== "number"
    ) {

      throw new MissingFieldError(
        "price.amount"
      );

    }

    this.required(
      product.price.currency,
      "price.currency"
    );

    if (
      !Array.isArray(
        product.images.urls
      )
    ) {

      throw new MissingFieldError(
        "images"
      );

    }


    if (
      !Array.isArray(
        product.keywords
      )
    ) {

      throw new MissingFieldError(
        "keywords"
      );

    }

if (
  product.variants &&
  !Array.isArray(
    product.variants
  )
) {

  throw new MissingFieldError(
    "variants"
  );

}

    return true;

  }



  /**
   * Required field checker
   */
  private required(
  value: unknown,
  field: string
): void {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {

    throw new MissingFieldError(
      field
     );

    }

  }

} 

export const productValidator =
  new ProductValidator();
