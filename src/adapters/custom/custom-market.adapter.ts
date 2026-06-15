import { AdapterProduct } from "../core/adapter.contract";

export class CustomMarketAdapter {
  constructor(private config?: any) {}

  async fetchProducts(): Promise<AdapterProduct[]> {
    if (!this.config?.products) return [];

    return this.config.products.map((p: any) => ({
      id: p.id,
      source: "custom",
      title: p.title,
      price: Number(p.price || 0),
      images: p.images || [],
      metadata: p.metadata || {},
    }));
  }
}
