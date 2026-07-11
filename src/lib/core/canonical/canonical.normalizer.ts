/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Normalizer
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Converts marketplace product data into a stable
 * canonical representation.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Normalize product identity fields
 * ✓ Normalize attributes
 * ✓ Prepare comparison-ready data
 *
 * MUST NOT contain:
 * ✗ Duplicate detection
 * ✗ Identity scoring
 * ✗ Merge logic
 * ✗ Repository access
 *
 * Uses:
 * ✓ Catalog Health NormalizationEngine
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Deterministic
 * ✓ Stateless
 * ✓ Universal Store ready
 * ✓ AI pipeline ready
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  CanonicalNormalizedProduct,
} from "./canonical.types";


import {
  NormalizationEngine,
} from "@/core/catalog-health/base/normalization.engine";


/**
 * ============================================================
 * CANONICAL NORMALIZER
 * ============================================================
 */

export class CanonicalNormalizer {


  private readonly normalizationEngine:
    NormalizationEngine;


  constructor() {

    this.normalizationEngine =
      new NormalizationEngine();

  }


  /**
   * Normalize marketplace product
   */
  public normalize(
    product: AdapterProduct
  ): CanonicalNormalizedProduct {


    return {

      title:
        this.normalizationEngine.normalizeText(
          product.title
        ),


      brand:
        this.normalizationEngine.normalizeBrand(
          product.brand
        ),


      sku:
        this.normalizationEngine.normalizeSKU(
          product.sku
        ),


      barcode:
        this.normalizationEngine.normalizeBarcode(
          product.barcode
        ),


      attributes:
        this.normalizationEngine.normalizeAttributes(
          product.attributes
        ),

    };

  }


  /**
   * Normalize single value
   */
  public normalizeValue(
    value?: string | null
  ): string {

    return this.normalizationEngine
      .normalizeText(value);

  }


  /**
   * Create stable comparison text
   */
  public comparisonText(
    product: CanonicalNormalizedProduct
  ): string {


    return [

      product.brand,

      product.title,

      product.sku,

      product.barcode,

    ]
      .filter(Boolean)
      .join("|");

  }

}
