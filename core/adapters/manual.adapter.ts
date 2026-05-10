import { BaseAdapter } from "./base.adapter";
import { Product } from "../core/product.model";

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
      price: raw.price,

      sales: raw.sales,
      likes: raw.likes,
      shares: raw.shares,
      sellerCount: raw.sellerCount,
    };
  }
}
