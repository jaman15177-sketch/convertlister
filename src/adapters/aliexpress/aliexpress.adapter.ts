import { AdapterProduct } from "../core/adapter.contract";

export interface AliExpressProduct {
  id: string;
  title: string;
  price: number;
  rating?: number;
  orders?: number;
  shippingTime?: number;
  imageUrl?: string;
}

export class AliExpressAdapter {
  async fetchProducts(): Promise<AdapterProduct[]> {
    return [
      {
        id: "alx_1",
        source: "aliexpress",
        title: "Wireless Smart LED Strip Light",
        price: 12.99,
        images: ["https://example.com/img1.jpg"],
        metadata: {
          rating: 4.6,
          orders: 12000,
          shippingTime: 7,
        },
      },
      {
        id: "alx_2",
        source: "aliexpress",
        title: "Portable Mini Blender USB",
        price: 18.5,
        images: ["https://example.com/img2.jpg"],
        metadata: {
          rating: 4.4,
          orders: 8000,
          shippingTime: 10,
        },
      },
    ];
  }
}
