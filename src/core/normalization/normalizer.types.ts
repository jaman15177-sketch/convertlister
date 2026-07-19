/**
 * ============================================================
 * CONVERTLISTER
 * NORMALIZER TYPES
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Shared types for normalization pipeline.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define normalized product structure
 * • Keep marketplace independent contract
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute normalization logic
 * ✗ Call marketplace API
 * ✗ Save database
 * ============================================================
 */


/**
 * Supported normalization status
 */
export type NormalizationStatus =
  | "IMPORTED"
  | "NORMALIZING"
  | "NORMALIZED"
  | "FAILED";



/**
 * Normalized attributes
 */
export interface NormalizedAttributes {

  readonly color?: string;

  readonly size?: string;

  readonly material?: string;

  readonly brand?: string;

  readonly model?: string;

  readonly variant?: string;

  readonly [key: string]: unknown;

}



/**
 * Normalized pricing
 */
export interface NormalizedPrice {

  readonly amount: number;

  readonly currency: string;

}



/**
 * Normalized image structure
 */
export interface NormalizedImages {

  readonly urls: readonly string[];

}

/**
 * Raw product from any marketplace
 */
export interface RawProduct {

  readonly id: string;

  readonly title: string;

  readonly description?: string;

  readonly price?: number;

  readonly currency?: string;

  readonly image?: string;

  readonly images?: string[];

  readonly source?: string;

  readonly category?: string;
readonly externalId?: string;

readonly marketplace?: string;

readonly brand?: string;

readonly sku?: string;

readonly barcode?: string;

readonly variants?: readonly NormalizedVariant[];
  readonly [key: string]: unknown;

}

/**
 * Universal normalized product
 *
 * Output of Normalizer Engine
 */
export interface NormalizedProduct {

  readonly id: string;

  readonly externalId?: string;

  readonly source: string;

  readonly marketplace: string;

  readonly title: string;

  readonly description?: string;

  readonly brand?: string;

  readonly sku?: string;

  readonly barcode?: string;

  readonly price: NormalizedPrice;

  readonly images: NormalizedImages;

  readonly category?: string;

  readonly attributes: NormalizedAttributes;

  readonly variants?: readonly NormalizedVariant[];

  readonly keywords: readonly string[];

  readonly status: NormalizationStatus;

  readonly metadata?: Readonly<Record<string, unknown>>;

}

  

export interface NormalizedVariant {

  readonly id: string;

  readonly sku?: string;

  readonly barcode?: string;

  readonly title?: string;

  readonly attributes?: Readonly<Record<string, unknown>>;

}



