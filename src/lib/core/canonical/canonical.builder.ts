/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Builder
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Builds final CanonicalProduct objects from validated,
 * normalized marketplace products.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Canonical object creation
 * ✓ Default value handling
 * ✓ Metadata creation
 *
 * MUST NOT contain:
 * ✗ Identity matching
 * ✗ Duplicate detection
 * ✗ Merge logic
 * ✗ Repository access
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Immutable output
 * ✓ Deterministic
 * ✓ Repository ready
 * ✓ Universal Store ready
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  CanonicalProduct,
  CanonicalNormalizedProduct,
  CanonicalMetadata,
  CanonicalSource,
} from "./canonical.types";


import {
  CANONICAL_VERSION,
} from "./canonical.constants";


/**
 * ============================================================
 * CANONICAL BUILDER
 * ============================================================
 */

export class CanonicalBuilder {


  /**
   * Build canonical product
   */
  public build(params: {
    product: AdapterProduct;

    normalized:
      CanonicalNormalizedProduct;

    fingerprint?: string;
  }): CanonicalProduct {


    const now =
      new Date();


    const source:
      CanonicalSource =
      this.buildSource(
        params.product
      );


    const metadata:
      CanonicalMetadata =
      this.buildMetadata(
        now,
        params.fingerprint
      );


    return {

      id:
        params.product.id,


      title:
        params.normalized.title,


      brand:
        params.normalized.brand || undefined,


      category:
        params.product.category,


      description:
        params.product.description,


      sku:
        params.normalized.sku || undefined,


      barcode:
        params.normalized.barcode || undefined,


      attributes:
        params.normalized.attributes,


      variants:
        [],


      sources:
        [source],


      metadata,

    };

  }


  /**
   * Build source information
   */
  private buildSource(
    product: AdapterProduct
  ): CanonicalSource {


    return {

      marketplace:
        product.marketplace ??
        product.source,


      sourceId:
        product.id,


      importedAt:
        new Date(),

    };

  }


  /**
   * Build metadata
   */
  private buildMetadata(
    date: Date,

    fingerprint?: string

  ): CanonicalMetadata {


    return {

      version:
        CANONICAL_VERSION,


      createdAt:
        date,


      updatedAt:
        date,


      fingerprint,

    };

  }

}
