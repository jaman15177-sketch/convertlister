/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Key Generator
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Generates stable identity keys used for:
 *
 * ✓ Product identity lookup
 * ✓ Duplicate detection
 * ✓ Universal Store indexing
 * ✓ Matching pipeline
 *
 * MUST NOT contain:
 * ✗ Database access
 * ✗ Repository logic
 * ✗ Merge logic
 * ✗ Business workflow
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Deterministic
 * ✓ Stable
 * ✓ Collision resistant
 * ✓ AI pipeline compatible
 * ============================================================
 */

import type {
  CanonicalNormalizedProduct,
} from "./canonical.types";


import {
  FINGERPRINT_SEPARATOR,
} from "./canonical.constants";


import {
  NormalizationEngine,
} from "@/core/catalog-health/base/normalization.engine";


/**
 * ============================================================
 * CANONICAL KEY
 * ============================================================
 */

export interface CanonicalKey {

  readonly value: string;

  readonly type:
    | "barcode"
    | "sku"
    | "identity"
    | "content";

}


/**
 * ============================================================
 * KEY GENERATOR
 * ============================================================
 */

export class CanonicalKeyGenerator {


  private readonly normalizer:
    NormalizationEngine;


  constructor() {

    this.normalizer =
      new NormalizationEngine();

  }


  /**
   * Generate strongest available key
   */
  public generate(
    product: CanonicalNormalizedProduct
  ): CanonicalKey {


    if (product.barcode) {

      return {

        value:
          product.barcode,

        type:
          "barcode",

      };

    }


    if (product.sku) {

      return {

        value:
          product.sku,

        type:
          "sku",

      };

    }


    return {

      value:
        this.generateIdentityKey(product),

      type:
        "identity",

    };

  }


  /**
   * Generate identity fingerprint
   */
  public generateIdentityKey(
    product: CanonicalNormalizedProduct
  ): string {


    const parts = [

      product.brand,

      product.title,

      product.sku,

      product.barcode,

    ];


    const raw =
      parts
        .map((value) =>
          this.normalizer
            .comparisonKey(value)
        )
        .filter(Boolean)
        .join(FINGERPRINT_SEPARATOR);


    return this.normalizer
      .stableHash(raw);

  }


  /**
   * Generate content key
   */
  public generateContentKey(
    title: string
  ): string {

    return this.normalizer
      .stableHash(title);

  }

}
