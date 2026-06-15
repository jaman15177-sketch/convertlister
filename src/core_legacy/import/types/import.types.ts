/**
 * ==========================================================
 * IMPORT ENGINE CONTRACTS
 * ==========================================================
 * Universal import layer for:
 * Shopify
 * Amazon
 * Etsy
 * CSV
 * API
 * AliExpress
 * TikTok Shop
 * ==========================================================
 */

export type ImportSource =
  | "shopify"
  | "amazon"
  | "etsy"
  | "csv"
  | "api"
  | "aliexpress"
  | "tiktok";

/**
 * Raw product coming from external source
 */
export interface RawProduct {
  source: ImportSource;

  sourceProductId: string;

  payload: unknown;

  importedAt: Date;
}

/**
 * Universal normalized product
 * Must match Universal Store structure
 */
export interface NormalizedProduct {
  id: string;

  source: ImportSource;

  sourceProductId: string;

  version: number;

  title: string;

  description: string;

  price: number;

  currency: string;

  images: string[];

  status:
    | "imported"
    | "processing"
    | "optimized"
    | "published"
    | "archived";

  intelligence: {
    category: string;

    marketFitScore: number;

    trendScore: number;

    winningProbability: number;
  };

  metadata: Record<string, unknown>;

  createdAt: Date;

  updatedAt: Date;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;

  errors: string[];
}

/**
 * Deduplication result
 */
export interface DedupeResult {
  duplicate: boolean;

  existingProductId?: string;
}

/**
 * Import pipeline result
 */
export interface ImportResult {
  success: boolean;

  source: ImportSource;

  importedCount: number;

  duplicateCount: number;

  failedCount: number;

  errors: string[];
}

/**
 * Normalizer contract
 */
export interface ProductNormalizer {
  normalize(raw: RawProduct): Promise<NormalizedProduct>;
}

/**
 * Validator contract
 */
export interface ProductValidator {
  validate(raw: RawProduct): ValidationResult;
}

/**
 * Dedupe contract
 */
export interface ProductDeduper {
  check(product: NormalizedProduct): Promise<DedupeResult>;
}
