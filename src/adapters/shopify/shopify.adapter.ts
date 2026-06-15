import { AdapterProduct } from "../core/adapter.contract";

export interface ShopifyProduct {
  id: string;
  title: string;
  price: number;
}

export class ShopifyAdapter {
  async fetchProducts(): Promise<AdapterProduct[]> {
    return [
      {
        id: "shop_1",
        source: "shopify",
        title: "Wireless LED Lamp",
        price: 25,
        images: [],
        metadata: {},
      },
    ];
  }
}
