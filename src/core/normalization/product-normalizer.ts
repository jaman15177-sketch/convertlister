/**
 * ============================================================
 * CONVERTLISTER
 * PRODUCT NORMALIZER V2
 * ============================================================
 */

import type {
  RawProduct,
  NormalizedProduct,
} from "./normalizer.types";

import {
  normalizationService,
} from "./normalization.service";

export class ProductNormalizer {

  /**
   * Normalize single product
   */
  static normalize(
    input: RawProduct,
    source: string,
  ): NormalizedProduct {

    return normalizationService.normalize(
      input,
      source,
    );

  }

  /**
   * Normalize product list
   */
  static normalizeMany(
    products: readonly RawProduct[],
    source: string,
  ): readonly NormalizedProduct[] {

    return normalizationService.normalizeMany(
      [...products],
      source,
    );

  }

}
