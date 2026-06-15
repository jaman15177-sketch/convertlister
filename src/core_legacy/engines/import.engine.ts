import { productStore } from "../../platform/store/product-store";

export class ImportEngine {
  async run(record: any) {
    if (!record?.id) {
      throw new Error("INVALID_RECORD");
    }

    const normalized = {
      id: record.id,
      title: record.title ?? "unknown",
      price: record.price ?? 0,
      currency: record.currency ?? "USD",
      source: record.source ?? "import",
      sourceProductId: record.sourceProductId ?? null,
      version: record.version ?? 1,
      images: record.images ?? [],
      status: "imported",
      intelligence: record.intelligence ?? {},
      metadata: record.metadata ?? {},
      createdAt: record.createdAt ?? new Date(),
      updatedAt: new Date(),
    };

    productStore.add(normalized);

    return normalized;
  }
}

export const importEngine = new ImportEngine();
