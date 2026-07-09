/**
 * ============================================================
 * CONVERTLISTER
 * Adapter Contract
 * Production Ready
 * Enterprise Scalable
 * Backward Compatible
 * ============================================================
 */

export interface AdapterQuery {
  keyword: string;
  page?: number;
  filters?: Record<string, unknown>;
}

/**
 * Marketplace Variant
 */
export interface ProductVariant {
  id: string;

  sku?: string;

  title?: string;

  price?: number;

  inventory?: number;

  barcode?: string;

  attributes?: Record<string, string>;

  metadata?: Record<string, unknown>;
}

/**
 * Marketplace Product
 */
export interface AdapterProduct {
  /**
   * Core
   */
  id: string;

  title: string;

  price: number;

  currency: string;

  source: string;

  /**
   * Optional business fields
   */
  sku?: string;

  brand?: string;

  category?: string;

  description?: string;

/**
 * Canonical Bullet Points
 * Shared across all marketplaces
 */
bullets?: string[];

barcode?: string;
  inventory?: number;

  marketplace?: string;

  /**
   * Media
   */
  images?: string[];

  /**
   * Product Attributes
   */
  attributes?: Record<string, string>;
/**
 * SEO Metadata
 */
seo?: {
  metaTitle?: string;

  metaDescription?: string;

  slug?: string;

  canonicalUrl?: string;

  robots?: string;
};
  /**
   * Variants
   */
  variants?: ProductVariant[];

  /**
   * Flexible metadata
   * (kept for backward compatibility)
   */
  metadata?: Record<string, unknown>;
}

export interface AdapterResult<T = AdapterProduct[]> {
  success: boolean;

  data: T;

  source: string;

  timestamp: number;

  error?: string;
}

export interface AdapterContract<
  Q = AdapterQuery,
  R = AdapterProduct[]
> {
  name: string;

  transform(input: Q): Q;

  execute(input: Q): Promise<AdapterResult<R>>;
}
