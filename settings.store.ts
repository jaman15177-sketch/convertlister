import { PlatformSettings, SourceType } from "./settings.types";

class SettingsStore {
  private settings: PlatformSettings;

  constructor() {
    this.settings = {
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
      },

      intelligence: {
        enableMarketFit: true,
        enableTrendDetection: true,
        enableWinningScore: true,
        scoringThreshold: 70,
      },

      distribution: {
        enableShopifyPush: true,
        enableAmazonPush: true,
        enableEtsyPush: true,
        enableTikTokPush: true,
        enableAds: false,
      },

      updatedAt: new Date(),
    };
  }

  get(): PlatformSettings {
    return this.settings;
  }

  updateImport(partial: Partial<PlatformSettings["import"]>) {
    this.settings.import = {
      ...this.settings.import,
      ...partial,
    };

    this.touch();
  }

  updateIntelligence(
    partial: Partial<PlatformSettings["intelligence"]>
  ) {
    this.settings.intelligence = {
      ...this.settings.intelligence,
      ...partial,
    };

    this.touch();
  }

  updateDistribution(
    partial: Partial<PlatformSettings["distribution"]>
  ) {
    this.settings.distribution = {
      ...this.settings.distribution,
      ...partial,
    };

    this.touch();
  }

  enableSource(source: SourceType) {
    if (!this.settings.import.enabledSources.includes(source)) {
      this.settings.import.enabledSources.push(source);
    }

    this.touch();
  }

  disableSource(source: SourceType) {
    this.settings.import.enabledSources =
      this.settings.import.enabledSources.filter((s) => s !== source);

    this.touch();
  }

  private touch() {
    this.settings.updatedAt = new Date();
  }
}

export const settingsStore = new SettingsStore();
