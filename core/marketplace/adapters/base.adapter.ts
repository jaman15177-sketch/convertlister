import { Product } from "../../product.model";

export interface BaseAdapter {
  fetch(): Promise<any[]> | any[];
  normalize(raw: any): Product;
}
