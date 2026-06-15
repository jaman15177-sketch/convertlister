import { ProductEntity } from "./product-entity";
import { fingerprintEngine } from "./fingerprint.engine";

export class CrossMarketMergeEngine {
  private graph = new Map<string, ProductEntity>();

  private THRESHOLD = 0.78;

  merge(product: {
    source: string;
    id: string;
    title: string;
    price: number;
  }): string {
    const productKey = fingerprintEngine.normalize(product.title);

    for (const entity of this.graph.values()) {
      const entityKey = fingerprintEngine.normalize(entity.title);

      const score = fingerprintEngine.similarity(
        productKey,
        entityKey
      );

      if (score >= this.THRESHOLD) {
        entity.sources.push({
          source: product.source,
          sourceId: product.id,
          price: product.price,
        });

        return entity.globalId;
      }
    }

    const globalId =
      "g_" + Date.now() + "_" + Math.floor(Math.random() * 9999);

    const newEntity: ProductEntity = {
      globalId,
      title: product.title,
      sources: [
        {
          source: product.source,
          sourceId: product.id,
          price: product.price,
        },
      ],
    };

    this.graph.set(globalId, newEntity);

    return globalId;
  }

  getAll(): ProductEntity[] {
    return [...this.graph.values()];
  }
}

export const crossMarketMergeEngine =
  new CrossMarketMergeEngine();
