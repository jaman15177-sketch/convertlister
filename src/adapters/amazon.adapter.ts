import { Adapter, NormalizedProduct } from "./core/base.adapter";
import { logger } from "../core/observability/logger";

export class AmazonAdapter implements Adapter {
  async fetchProducts(limit = 15): Promise<NormalizedProduct[]> {
    try {
      const items = Array.from({ length: limit }).map((_, i) => ({
        id: `amz_${i}`,
        title: `Amazon Product ${i}`,
        price: 20 + i,
        currency: "USD",
        images: [],
        source: "amazon",
        sourceProductId: `amz_${i}`,
      }));

      logger.info("AMAZON_FETCH", { count: items.length });

      return items;
    } catch (err: any) {
      logger.error("AMAZON_ERROR", { error: err.message });
      throw err;
    }
  }
}

export const amazonAdapter = new AmazonAdapter();
