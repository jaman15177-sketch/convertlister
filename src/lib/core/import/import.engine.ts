
import type {
  RawProduct,
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import { ProductNormalizer } from "@/core/normalization/product-normalizer";
import { NormalizerMapper } from "@/core/normalization/normalizer.mapper";

import { AdapterMapper } from "@/adapters/core/adapter.mapper";

import { CanonicalEngine } from "@/lib/core/canonical";

import { universalStoreRegistry } from "@/lib/core/store/universal.store.registry";

import { ImportMapper } from "./import.mapper";
import { importValidator } from "./import.validator";
import { DEFAULT_IMPORT_BATCH_SIZE } from "./import.constants";
import { ImportIdentity } from "./import.identity";

import {
  ImportDuplicatePolicy,
  ImportAction,
} from "./import.duplicate";

import {
  productPersistenceService,
} from "../persistence";

import type {
  ImportEngineContract,
} from "./import.contract";

import type {
  ImportRequest,
  ImportResult,
  ImportStatistics,
  ImportError,
  ImportSource,
} from "./import.types";

export class ImportEngine implements ImportEngineContract {
private readonly canonicalEngine =
    new CanonicalEngine();
  async executeSingle(
  product: RawProduct,
  source: ImportSource,
  organizationId: string
): Promise<NormalizedProduct> {

    const normalized =
  ProductNormalizer.normalize(
    product,
    source
  );

const canonical =
  this.canonicalEngine.execute({
    product: normalized,
    existingProducts: [],
  });

const identityProduct =
  ImportIdentity.apply(
    normalized,
    canonical
  );

const decision =
  ImportDuplicatePolicy.decide(
    canonical
  );

if (decision.action === ImportAction.SKIP) {
  return identityProduct;
}

const entity =
  ImportMapper.toEntity(
    identityProduct
  );

  const store =
    universalStoreRegistry.get(
      organizationId
    );

  await store.upsert(
    entity
  );
await productPersistenceService.persist({

  organizationId,

  entity,

  mode: "create",

});

return normalized;

}

  async execute(
  request: ImportRequest
): Promise<ImportResult> {

  importValidator.validate(request);

  const batchSize =
    request.options?.batchSize ??
    DEFAULT_IMPORT_BATCH_SIZE;

    const statistics: ImportStatistics = {
      total: request.products.length,
      imported: 0,
      skipped: 0,
      failed: 0,
      duplicated: 0,
    };

    const products: NormalizedProduct[] = [];
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
          const saved =
  await this.executeSingle(
    raw as RawProduct,
    request.source,
    request.organizationId
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

