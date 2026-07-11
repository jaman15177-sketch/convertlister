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

export class DefaultImportService implements ImportService {
  async import(request: ImportRequest): Promise<ImportResult> {
    return importEngine.execute(request);
  }

  async importSingle(
    product: unknown,
    source: ImportSource
  ): Promise<AdapterProduct> {
    return importEngine.executeSingle(product as never, source);
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
}

export const importService = new DefaultImportService();

