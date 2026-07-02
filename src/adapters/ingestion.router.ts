import type {
  AdapterQuery,
  AdapterResult,
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import { AliExpressAdapter } from "./aliexpress/aliexpress.adapter";
import { AmazonAdapter } from "./amazon/amazon.adapter";
import { ShopifyAdapter } from "./shopify/shopify.adapter";
import { TikTokAdapter } from "./tiktok/tiktok.adapter";
import { CustomMarketAdapter } from "./custom/custom-market.adapter";

type Source =
  | "aliexpress"
  | "amazon"
  | "shopify"
  | "tiktok"
  | "custom";

export interface IngestionRequest extends AdapterQuery {
  source: Source;
}

export class IngestionRouter {
  private readonly aliexpress = new AliExpressAdapter();
  private readonly amazon = new AmazonAdapter();
  private readonly shopify = new ShopifyAdapter();
  private readonly tiktok = new TikTokAdapter();
  private readonly custom = new CustomMarketAdapter();

  async route(
    req: IngestionRequest
  ): Promise<AdapterResult<AdapterProduct[]>> {
    try {
      const normalizedQuery: AdapterQuery = {
        keyword: req.keyword.trim(),
        page: req.page ?? 1,
        filters: req.filters ?? {},
      };

      switch (req.source) {
        case "aliexpress":
          return await this.aliexpress.execute(normalizedQuery);

        case "amazon":
          return await this.amazon.execute(normalizedQuery);

        case "shopify":
          return await this.shopify.execute(normalizedQuery);

        case "tiktok":
          return await this.tiktok.execute(normalizedQuery);

        case "custom":
          return await this.custom.execute(normalizedQuery);

        default:
          return {
            success: false,
            data: [],
            source: "ingestion-router",
            timestamp: Date.now(),
            error: `Unsupported source: ${String(req.source)}`,
          };
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        source: "ingestion-router",
        timestamp: Date.now(),
        error:
          error instanceof Error
            ? error.message
            : "Unknown routing error",
      };
    }
  }
}
