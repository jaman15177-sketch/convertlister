export type SourceType =
  | "shopify"
  | "amazon"
  | "etsy"
  | "csv"
  | "api"
  | "aliexpress"
  | "tiktok";

export interface ImportSettings {
  enabledSources: SourceType[];

  batchSize: number;

  syncIntervalMs: number;

  autoImport: boolean;

  deduplicationMode: "strict" | "loose";

  currency: string;
}

export interface IntelligenceSettings {
  enableMarketFit: boolean;
  enableTrendDetection: boolean;
  enableWinningScore: boolean;
  scoringThreshold: number;
}

export interface DistributionSettings {
  enableShopifyPush: boolean;
  enableAmazonPush: boolean;
  enableEtsyPush: boolean;
  enableTikTokPush: boolean;
  enableAds: boolean;
}

export interface PlatformSettings {
  import: ImportSettings;
  intelligence: IntelligenceSettings;
  distribution: DistributionSettings;

  updatedAt: Date;
}
