import { productStore } from "../../platform/store/product-store";
import type {
  ProductRecord,
  ProductStatus,
} from "../../platform/store/product.types";
import { Result } from "../../types/result";

export class ImportEngine {
  async process(record: any): Promise<Result<ProductRecord>> {
    try {
      if (!record?.id) {
        return { success: false, error: "INVALID_PAYLOAD" };
      }

      const timestamp = new Date();

      const status: ProductStatus = this.normalizeStatus(record.status);

      const clean: ProductRecord = {
        id: record.id,
        title: record.title ?? "unknown",
        price: record.price ?? 0,
        currency: record.currency ?? "USD",
        status,
        createdAt: timestamp,
        updatedAt: timestamp,
        source: record.source ?? "import",
        sourceProductId: record.sourceProductId ?? "",
        version: record.version ?? 1,
        images: record.images ?? [],
      };

      productStore.add(clean);

      return { success: true, data: clean };
    } catch (e: any) {
      return { success: false, error: e.message ?? "IMPORT_FAILED" };
    }
  }

  private normalizeStatus(status: any): ProductStatus {
    const allowed: ProductStatus[] = [
      "imported",
      "processing",
      "optimized",
      "published",
      "archived",
    ];

    if (allowed.includes(status)) return status;
    return "imported";
  }
}
