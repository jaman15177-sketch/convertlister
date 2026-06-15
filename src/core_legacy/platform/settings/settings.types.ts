export type SourceType =
  | "shopify"
  | "amazon"
  | "etsy"
  | "csv"
  | "api"
  | "aliexpress"
  | "tiktok";

/**
 * -------------------------
 * IMPORT SYSTEM SETTINGS
 * -------------------------
 * Controls all product ingestion behavior
 */
export interface ImportSettings {
  enabledSources: SourceType[];

  batchSize: number;

  syncIntervalMs: number;

  autoImport: boolean;

  deduplicationMode: "strict" | "loose";

  currency: string;

  maxProductsPerRun: number;

  retryFailedImports: boolean;
}

/**
 * -------------------------
 * INTELLIGENCE SETTINGS
 * -------------------------
 * Controls product scoring + analysis
 */
export interface IntelligenceSettings {
  enableMarketFit: boolean;

  enableTrendDetection: boolean;

  enableWinningScore: boolean;

  scoringThreshold: number;

  minConfidenceLevel: number;
}

/**
 * -------------------------
 * DISTRIBUTION SETTINGS
 * -------------------------
 * Controls product publishing layer
 */
export interface DistributionSettings {
  enableShopifyPush: boolean;

  enableAmazonPush: boolean;

  enableEtsyPush: boolean;

  enableTikTokPush: boolean;

  enableAds: boolean;

  autoPublishWinningProducts: boolean;
}

/**
 * -------------------------
 * PLATFORM SETTINGS ROOT
 * -------------------------
 * Single source of truth for SaaS brain control
 */
export interface PlatformSettings {
  import: ImportSettings;

  intelligence: IntelligenceSettings;

  distribution: DistributionSettings;

  tenantId?: string;

  environment: "dev" | "staging" | "prod";

  updatedAt: Date;
}
