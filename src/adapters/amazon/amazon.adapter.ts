import { AdapterProduct } from "../core/adapter.contract";

export class AmazonAdapter {
  async fetchProducts(): Promise<AdapterProduct[]> {
    return [
      {
        id: "amz_1",
        source: "amazon",
        title: "Smart Fitness Band",
        price: 39,
        images: [],
        metadata: {
          rating: 4.5,
          orders: 5000,
        },
      },
    ];
  }
}
