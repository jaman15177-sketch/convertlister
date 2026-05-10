import { Product } from "../product.model";

export class SEOEngine {
  generate(product: Product) {
    return [
      product.title.toLowerCase(),
      `${product.category ?? ""} best seller`,
      `${product.brand ?? ""} trending`,
    ];
  }
}
