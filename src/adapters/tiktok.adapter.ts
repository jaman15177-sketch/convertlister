import { Adapter, NormalizedProduct } from "./core/base.adapter";
import { logger } from "../core/observability/logger";

export class TikTokAdapter implements Adapter {
  async fetchProducts(limit = 10): Promise<NormalizedProduct[]> {
    try {
      const items = Array.from({ length: limit }).map((_, i) => ({
        id: `tt_${i}`,
        title: `TikTok Viral Product ${i}`,
        price: 5 + i,
        currency: "USD",
        images: [],
        source: "tiktok",
        sourceProductId: `tt_${i}`,
      }));

      logger.info("TIKTOK_FETCH", { count: items.length });

      return items;
    } catch (err: any) {
      logger.error("TIKTOK_ERROR", { error: err.message });
      throw err;
    }
  }
}

export const tiktokAdapter = new TikTokAdapter();
