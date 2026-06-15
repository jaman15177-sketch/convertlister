import { Adapter, NormalizedProduct } from "./core/base.adapter";
import { tenantContext } from "../core/tenant/tenant.context";
import { logger } from "../core/observability/logger";

export class AliExpressAdapter implements Adapter {
  async fetchProducts(limit = 20): Promise<NormalizedProduct[]> {
    try {
      const tenant = tenantContext.get();

      // MOCK API (replace with real API later)
      const items = Array.from({ length: limit }).map((_, i) => ({
        id: `ae_${i}`,
        title: `AliExpress Product ${i}`,
        price: 10 + i,
        currency: "USD",
        images: [],
        source: "aliexpress",
        sourceProductId: `ae_${i}`,
        tenantId: tenant.tenantId,
      }));

      logger.info("ALIEXPRESS_FETCH", { count: items.length });

      return items;
    } catch (err: any) {
      logger.error("ALIEXPRESS_ERROR", { error: err.message });
      throw err;
    }
  }
}

export const aliexpressAdapter = new AliExpressAdapter();
