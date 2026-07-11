import type { AdapterProduct } from "@/adapters/core/adapter.contract";

/**
 * Raw product coming from ANY marketplace
 * (Amazon, AliExpress, Shopify, Custom APIs, etc.)
 */
export interface RawProduct {
  id: string;
  title: string;

  price?: number;
  currency?: string;

  image?: string;
  images?: string[];

  source?: string;

  [key: string]: any;
}

/**
 * SINGLE SOURCE NORMALIZATION ENGINE
 * Converts chaotic marketplace data → unified AdapterProduct
 */
export class ProductNormalizer {
  static normalize(input: RawProduct, source: string): AdapterProduct {
    return {
      id: input.id,
      title: String(input.title ?? "").trim(),

      price: Number.isFinite(Number(input.price))
  ? Number(input.price)
  : 0,
      currency: String(input.currency ?? "USD").toUpperCase(),
      source: source.toLowerCase(),

      // 🔥 critical normalization fix (images standardization)
      
          images: Array.isArray(input.images)
  ? input.images.filter(Boolean)
  : input.image
    ? [input.image]
    : [],

      metadata: {
        // preserve full raw payload for debugging / AI learning
        raw: input,

        // optional enriched fields
        rating: input.rating,
        orders: input.orders,
        brand: input.brand,
        category: input.category,
        url: input.url,
      },
    };
  }
}
