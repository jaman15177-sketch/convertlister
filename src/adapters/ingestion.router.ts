import { aliexpressAdapter } from "./aliexpress.adapter";
import { amazonAdapter } from "./amazon.adapter";
import { tiktokAdapter } from "./tiktok.adapter";
import { NormalizedProduct } from "./core/base.adapter";

export type SourceType = "aliexpress" | "amazon" | "tiktok";

export class IngestionRouter {
  async ingest(source: SourceType): Promise<NormalizedProduct[]> {
    switch (source) {
      case "aliexpress":
        return aliexpressAdapter.fetchProducts();

      case "amazon":
        return amazonAdapter.fetchProducts();

      case "tiktok":
        return tiktokAdapter.fetchProducts();

      default:
        throw new Error("UNKNOWN_SOURCE");
    }
  }
}

export const ingestionRouter = new IngestionRouter();
