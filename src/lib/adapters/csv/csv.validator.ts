/**
 * ==========================================================
 * CSV VALIDATOR
 * ==========================================================
 *
 * Enterprise CSV Validator
 *
 * Responsibilities
 * - Validate AdapterProduct
 * - Validate mapped products
 *
 * Rules
 * - No parsing
 * - No mapping
 * - No profile detection
 * - No import logic
 * ==========================================================
 */

import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  CsvValidatorContract,
} from "./csv.contract";

export class CsvValidator
  implements CsvValidatorContract
{

  async validate(
  products: readonly RawProduct[]
): Promise<boolean>{

    for (const product of products) {

      if (!this.isValid(product)) {

        return false;

      }

    }

    return true;

  }

  private isValid(
  product: RawProduct
): boolean {

    if (
      !product.id ||
      product.id.trim() === ""
    ) {

      return false;

    }

    if (
      !product.title ||
      product.title.trim() === ""
    ) {

      return false;

    }

    if (
      typeof product.price !== "number"
    ) {

      return false;

    }

    if (
      !product.currency
    ) {

      return false;

    }

    if (
      !product.source
    ) {

      return false;

    }

    return true;

  }

}

export const csvValidator =
  new CsvValidator();
