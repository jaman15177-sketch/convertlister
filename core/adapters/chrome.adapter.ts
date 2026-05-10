import { BaseAdapter } from "./base.adapter";
import { Product } from "../product.model";

export class ChromeAdapter implements BaseAdapter {
  fetch(): Promise<any[]> {
    throw new Error("Not implemented");
  }

  normalize(raw: any): Product {
    return {
      id: crypto.randomUUID(),
      source: "chrome",

      title: raw.title,
      price: raw.price,

      sales: raw.sales,
      likes: raw.likes,
      shares: raw.shares,

      sellerCount: raw.sellerCount,
    };
  }
}
