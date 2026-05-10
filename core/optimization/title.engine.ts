import { Product } from "../product.model";

export class TitleEngine {
  generate(product: Product) {
    return `${product.brand ?? ""} ${product.title}`.trim();
  }
}
