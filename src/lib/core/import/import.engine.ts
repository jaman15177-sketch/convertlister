import { ProductNormalizer } from "@/core/normalization/product-normalizer";
import type { RawProduct } from "@/core/normalization/product-normalizer";
import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import { productRepository } from "@/lib/core/repository/product.repository";
import { importValidator } from "./import.validator";
import { DEFAULT_IMPORT_BATCH_SIZE } from "./import.constants";
import type { ImportEngineContract } from "./import.contract";
import type {
  ImportRequest,
  ImportResult,
  ImportStatistics,
  ImportError,
  ImportSource,
} from "./import.types";

export class ImportEngine implements ImportEngineContract {
  executeSingle(
    product: RawProduct,
    source: ImportSource
  ): AdapterProduct {
    const normalized = ProductNormalizer.normalize(product, source);
    return productRepository.upsert(normalized);
  }

  execute(request: ImportRequest): ImportResult {
    importValidator.validate(request);

    const batchSize =
      request.options?.batchSize ?? DEFAULT_IMPORT_BATCH_SIZE;

    const statistics: ImportStatistics = {
      total: request.products.length,
      imported: 0,
      skipped: 0,
      failed: 0,
      duplicated: 0,
    };

    const products: AdapterProduct[] = [];
    const errors: ImportError[] = [];

    for (
      let batchStart = 0;
      batchStart < request.products.length;
      batchStart += batchSize
    ) {
      const batch = request.products.slice(
        batchStart,
        batchStart + batchSize
      );

      for (const raw of batch) {
        try {
          const saved = this.executeSingle(
            raw as RawProduct,
            request.source
          );
          products.push(saved);
          statistics.imported++;
        } catch (error) {
          statistics.failed++;
          errors.push({
            code: "IMPORT_ERROR",
            message:
              error instanceof Error
                ? error.message
                : "Unknown import error",
          });
        }
      }
    }

    return {
      success: errors.length === 0,
      products,
      statistics,
      errors,
    };
  }
}

export const importEngine = new ImportEngine();

