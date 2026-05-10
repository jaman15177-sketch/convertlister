import { Product } from "../core/product.model";

export interface BaseAdapter {
  fetch(): Promise<any[]>;      // raw data
  normalize(raw: any): Product; // convert to universal format
}
