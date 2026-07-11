/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Mapper
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Maps normalized product data into canonical domain
 * structures.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ AdapterProduct → CanonicalProduct mapping
 * ✓ Normalized data mapping
 * ✓ Variant mapping
 *
 * MUST NOT contain:
 * ✗ Validation logic
 * ✗ Identity matching
 * ✗ Duplicate detection
 * ✗ Merge strategy
 * ✗ Repository logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Pure transformation
 * ✓ Stateless
 * ✓ Deterministic
 * ✓ Universal Store ready
 * ============================================================
 */

import type {
  AdapterProduct,
  ProductVariant,
} from "@/adapters/core/adapter.contract";

import type {
  CanonicalProduct,
  CanonicalVariant,
  CanonicalSource,
  CanonicalMetadata,
} from "./canonical.types";


import {
  CANONICAL_VERSION,
} from "./canonical.constants";


/**
 * ============================================================
 * CANONICAL MAPPER
 * ============================================================
 */

export class CanonicalMapper {


  /**
   * Map AdapterProduct to CanonicalProduct
   */
  public map(
    product: AdapterProduct
  ): CanonicalProduct {


    const now =
      new Date();


    return {

      id:
        product.id,


      title:
        product.title,


      brand:
        product.brand,


      category:
        product.category,


      description:
        product.description,


      sku:
        product.sku,


      barcode:
        product.barcode,


      attributes:
        product.attributes ?? {},


      variants:
        this.mapVariants(
          product.variants
        ),


      sources: [
        this.mapSource(product),
      ],


      metadata:
        this.createMetadata(now),

    };

  }


  /**
   * Map marketplace variant
   */
  public mapVariant(
    variant: ProductVariant
  ): CanonicalVariant {


    return {

      id:
        variant.id,


      sku:
        variant.sku,


      barcode:
        variant.barcode,


      title:
        variant.title,


      attributes:
        variant.attributes ?? {},

    };

  }


  /**
   * Map all variants
   */
  public mapVariants(
    variants?: ReadonlyArray<ProductVariant>
  ): CanonicalVariant[] {


    if (!variants) {

      return [];

    }


    return variants.map(
      (variant) =>
        this.mapVariant(variant)
    );

  }


  /**
   * Create source identity
   */
  private mapSource(
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
   * Create metadata
   */
  private createMetadata(
    date: Date
  ): CanonicalMetadata {


    return {

      version:
        CANONICAL_VERSION,


      createdAt:
        date,


      updatedAt:
        date,

    };

  }

}
