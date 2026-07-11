/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Validator
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Validates input before canonical processing.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Validate required product fields
 * ✓ Validate identity fields
 * ✓ Validate structural integrity
 *
 * MUST NOT contain:
 * ✗ Normalization logic
 * ✗ Duplicate detection
 * ✗ Merge logic
 * ✗ Repository logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Deterministic
 * ✓ Production safe
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import {
  CanonicalErrorFactory,
} from "./canonical.errors";


/* ============================================================
 * VALIDATION RESULT
 * ============================================================
 */

export interface CanonicalValidationResult {

  readonly valid: boolean;

  readonly errors:
    ReadonlyArray<string>;

}


/* ============================================================
 * CANONICAL VALIDATOR
 * ============================================================
 */

export class CanonicalValidator {


  /**
   * Validate adapter product
   */
  public validate(
    product: AdapterProduct
  ): CanonicalValidationResult {


    const errors: string[] = [];


    /* --------------------------------------------------------
     * CORE VALIDATION
     * --------------------------------------------------------
     */

    if (!product) {

      errors.push(
        "Product is required"
      );

      return {
        valid: false,
        errors,
      };
    }


    if (
      !product.id ||
      product.id.trim().length === 0
    ) {

      errors.push(
        "Product id is required"
      );
    }


    if (
      !product.title ||
      product.title.trim().length === 0
    ) {

      errors.push(
        "Product title is required"
      );
    }


    if (
      !product.source ||
      product.source.trim().length === 0
    ) {

      errors.push(
        "Product source is required"
      );
    }


    /* --------------------------------------------------------
     * PRICE VALIDATION
     * --------------------------------------------------------
     */

    if (
      typeof product.price !== "number" ||
      Number.isNaN(product.price)
    ) {

      errors.push(
        "Product price must be numeric"
      );
    }


    /* --------------------------------------------------------
     * ATTRIBUTE VALIDATION
     * --------------------------------------------------------
     */

    if (
      product.attributes &&
      typeof product.attributes !== "object"
    ) {

      errors.push(
        "Product attributes must be object"
      );
    }


    /* --------------------------------------------------------
     * RESULT
     * --------------------------------------------------------
     */

    return {

      valid:
        errors.length === 0,

      errors,

    };
  }


  /**
   * Throws when invalid
   */
  public assertValid(
    product: AdapterProduct
  ): void {


    const result =
      this.validate(product);


    if (!result.valid) {

      throw CanonicalErrorFactory.invalidProduct(
        result.errors.join(", ")
      );

    }

  }

}
