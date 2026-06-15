import {
  PlatformSettings,
  SourceType,
} from "./settings.types";

/**
 * -------------------------
 * SETTINGS STORE (BRAIN LAYER)
 * -------------------------
 * - In-memory runtime config
 * - Controls entire SaaS behavior
 * - Safe mutation layer
 */

class SettingsStore {
  private state: PlatformSettings;

  constructor() {
    this.state = {
      import: {
        enabledSources: [
          "shopify",
          "amazon",
          "etsy",
          "csv",
          "api",
          "aliexpress",
          "tiktok",
        ],

        batchSize: 50,
        syncIntervalMs: 300000,
        autoImport: true,
        deduplicationMode: "strict",
        currency: "USD",

        maxProductsPerRun: 500,
        retryFailedImports: true,
      },

      intelligence: {
        enableMarketFit: true,
        enableTrendDetection: true,
        enableWinningScore: true,
        scoringThreshold: 70,
        minConfidenceLevel: 60,
      },

      distribution: {
        enableShopifyPush: true,
        enableAmazonPush: true,
        enableEtsyPush: true,
        enableTikTokPush: true,
        enableAds: false,
        autoPublishWinningProducts: false,
      },

      environment: "dev",
      tenantId: "default",
      updatedAt: new Date(),
    };
  }

  /**
   * Get full settings snapshot
   */
  get(): PlatformSettings {
    return this.state;
  }

  /**
   * Replace entire state (careful use)
   */
  set(newState: PlatformSettings) {
    this.state = {
      ...newState,
      updatedAt: new Date(),
    };
  }

  /**
   * Update import config only
   */
  updateImport(partial: Partial<PlatformSettings["import"]>) {
    this.state.import = {
      ...this.state.import,
      ...partial,
    };

    this.touch();
  }

  /**
   * Update intelligence config only
   */
  updateIntelligence(
    partial: Partial<PlatformSettings["intelligence"]>
  ) {
    this.state.intelligence = {
      ...this.state.intelligence,
      ...partial,
    };

    this.touch();
  }

  /**
   * Update distribution config only
   */
  updateDistribution(
    partial: Partial<PlatformSettings["distribution"]>
  ) {
    this.state.distribution = {
      ...this.state.distribution,
      ...partial,
    };

    this.touch();
  }

  /**
   * Enable a data source
   */
  enableSource(source: SourceType) {
    if (!this.state.import.enabledSources.includes(source)) {
      this.state.import.enabledSources.push(source);
    }

    this.touch();
  }

  /**
   * Disable a data source
   */
  disableSource(source: SourceType) {
    this.state.import.enabledSources =
      this.state.import.enabledSources.filter(
        (s) => s !== source
      );

    this.touch();
  }

  /**
   * Reset to default state
   */
  reset() {
    this.constructor();
  }

  /**
   * Internal timestamp update
   */
  private touch() {
    this.state.updatedAt = new Date();
  }
}

/**
 * SINGLETON EXPORT
 * (global SaaS brain instance)
 */
export const settingsStore = new SettingsStore();
