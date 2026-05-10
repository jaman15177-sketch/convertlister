import { BaseAdapter } from "./base.adapter";
import { Product } from "../../product.model";

export class ManualAdapter implements BaseAdapter {
  fetch(): any[] {
    return [
      {
        title: "LED Light",
        price: 20,
        sales: 1000,
        likes: 5000,
        shares: 1200,
        sellerCount: 3,
      },
    ];
  }

  normalize(raw: any): Product {
    return {
      id: crypto.randomUUID(),
      source: "manual",
      sourceId: "local",

      title: raw.title,
      description: raw.description || "",
      category: raw.category || "",
      brand: raw.brand || "",

      price: raw.price,
      currency: "USD",

      sales: raw.sales,
      views: raw.views || 0,
      orders: raw.orders || 0,

      likes: raw.likes,
      shares: raw.shares,
      comments: raw.comments || 0,

      sellerCount: raw.sellerCount,
      saturationScore: raw.saturationScore || 0,

      score: 0,
      decision: "review",
      isWinning: false,
    };
  }
}
