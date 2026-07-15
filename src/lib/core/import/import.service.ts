import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type {
  ImportJob,
  ImportRequest,
  ImportResult,
  ImportSource,
} from "./import.types";

import {
  ImportPriority,
  ImportStatus,
} from "./import.types";

import type { ImportService } from "./import.contract";
import { importEngine } from "./import.engine";
import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";
import {
  productPersistenceService,
} from "../persistence";

import {
  ImportMapper,
} from "./import.mapper";
import type {
  ImportPersistenceRequest,
} from "./import.types";
import {
  importOrchestrator,
} from "./import.orchestrator";
export class DefaultImportService implements ImportService {
  async import(
  request: ImportRequest
): Promise<ImportResult> {

  return importOrchestrator.import(
    request
  );

}
private readonly persistence =
    productPersistenceService;
  async importSingle(
  product: RawProduct,
  source: ImportSource,
  organizationId: string
): Promise<AdapterProduct> {
    return importEngine.executeSingle(
  product as never,
  source,
  organizationId
);
  }

  async createJob(request: ImportRequest): Promise<ImportJob> {
    return {
      id: crypto.randomUUID(),
      status: ImportStatus.PENDING,
      priority: ImportPriority.NORMAL,
      request,
      context: {
        requestId: crypto.randomUUID(),
        organizationId: request.organizationId,
        startedAt: new Date(),
      },
    };
  }

  async getJob(jobId: string): Promise<ImportJob | null> {
    void jobId;
    return null;
}
  /* ==========================================================
 * PERSIST IMPORT
 * ==========================================================
 */

private async persistEntity(
  request: ImportPersistenceRequest
): Promise<void> {

  const persistenceRequest =
    ImportMapper.toPersistenceRequest(
      request
    );

  await this.persistence.persist(
    persistenceRequest
  );

}
}

export const importService = new DefaultImportService();

