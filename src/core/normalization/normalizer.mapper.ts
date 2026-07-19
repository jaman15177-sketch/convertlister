/**
 * ============================================================
 * CONVERTLISTER
 * Normalizer Mapper
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * AdapterProduct -> NormalizedProduct
 *
 * Rules
 * ------------------------------------------------------------
 * ✓ Pure mapper
 * ✓ Stateless
 * ✓ Deterministic
 * ✓ No validation
 * ✓ No normalization logic
 * ✓ No database
 * ✓ No repository
 * ✓ No AI
 * ✓ No business logic
 * ============================================================
 */

import type {
  AdapterProduct,
  ProductVariant,
} from "@/adapters/core/adapter.contract";

import type {
  NormalizedProduct,
  NormalizedVariant,
} from "./normalizer.types";
export class NormalizerMapper {

  /**
   * ==========================================================
   * AdapterProduct -> NormalizedProduct
   * ==========================================================
   */
  public static toNormalized(
    product: AdapterProduct,
  ): NormalizedProduct {

    return {

      id: product.id,

externalId: product.id,

source: product.source,

    

      marketplace:
  product.marketplace ?? product.source,
      title:
        product.title,

      description:
        product.description,

      brand:
        product.brand,

      category:
        product.category,

      sku:
        product.sku,

      barcode:
        product.barcode,

      price: {
  amount: product.price,
  currency: product.currency,
},
      images: {
  urls: [...(product.images ?? [])],
},

      attributes:
        Object.fromEntries(
          Object.entries(
            product.attributes ?? {},
          ).map(([key, value]) => [
            key,
            String(value),
          ]),
        ),

      variants:
  this.mapVariants(
    product.variants,
  ),

keywords: [],

status: "NORMALIZED",

metadata:
       {
          ...(product.metadata ?? {}),
        },

    };

  }

  /**
   * ==========================================================
   * Variants
   * ==========================================================
   */
  private static mapVariants(
    variants?: readonly ProductVariant[],
  ): readonly NormalizedVariant[] {

    if (!variants) {
      return [];
    }

    return variants.map(
  (variant): NormalizedVariant => ({

    id: variant.id,

    sku: variant.sku,

    title: variant.title,

    barcode: variant.barcode,

    attributes:
      Object.fromEntries(
        Object.entries(
          variant.attributes ?? {},
        ).map(([key, value]) => [
          key,
          String(value),
        ]),
      ),

  }),
);
          
  }

}
