/**
 * ============================================================
 * CONVERTLISTER
 * NORMALIZATION SERVICE
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Orchestrate normalization pipeline
 * • Convert raw product to normalized product
 * • Validate output
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Save database
 * ✗ Create canonical identity
 * ✗ Execute AI logic
 * ============================================================
 */


import type {
  RawProduct,
  NormalizedProduct,
} from "./normalizer.types";


import {
  productMapper,
} from "./product.mapper";


import {
  productValidator,
} from "./product.validator";



export class NormalizationService {



  /**
   * Normalize product
   */
  public normalize(
    input: RawProduct,
    source: string
  ): NormalizedProduct {


    const product =
      productMapper.map(
        input,
        source
      );



    productValidator.validate(
      product
    );



    return product;

  }



  /**
   * Normalize multiple products
   */
  public normalizeMany(
    products: RawProduct[],
    source: string
  ): NormalizedProduct[] {


    return products.map(
      product =>
        this.normalize(
          product,
          source
        )
    );

  }


}



export const normalizationService =
  new NormalizationService();
