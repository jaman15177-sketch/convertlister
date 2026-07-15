/**
 * ==========================================================
 * ALIEXPRESS TYPES
 * ==========================================================
 *
 * Shared type definitions for AliExpress Adapter.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Raw marketplace data contracts
 * • API response types
 * • Adapter internal types
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Business decision
 * ✗ Normalization logic
 * ✗ Universal Store logic
 * ==========================================================
 */


/**
 * AliExpress Product Search Query
 */
export interface AliExpressSearchQuery {

  keyword: string;

  page?: number;

  limit?: number;

  categoryId?: string;

}



/**
 * AliExpress Product Raw Data
 */
export interface AliExpressRawProduct {

  id: string;

  title?: string;

  description?: string;

  images?: string[];

  category?: string;

  price?: number;

  discount?: number;

  currency?: string;

  shippingCost?: number;

  deliveryEstimate?: string;

  reviewCount?: number;

  rating?: number;

  orders?: number;

  storeName?: string;

  storeRating?: number;

  brand?: string;

  sku?: string;

  variants?: AliExpressVariant[];

  stock?: number;

  attributes?: Record<string, unknown>;

  tags?: string[];

  url?: string;

  region?: string;

egion?: string;

  metadata?: Record<string, unknown>;}



/**
 * Product Variant
 */
export interface AliExpressVariant {

  id: string;

  name?: string;

  value?: string;

  price?: number;

  stock?: number;

}



/**
 * Shipping Information
 */
export interface AliExpressShipping {

  cost?: number;

  currency?: string;

  deliveryTime?: string;

  available?: boolean;

}



/**
 * Store Information
 */
export interface AliExpressStore {

  id?: string;

  name?: string;

  rating?: number;

  totalProducts?: number;

}



/**
 * Review Information
 */
export interface AliExpressReview {

  count?: number;

  rating?: number;

}



/**
 * API Response Wrapper
 */
export interface AliExpressResponse<T> {

  success: boolean;

  data: T;

  message?: string;

  timestamp: number;

}
