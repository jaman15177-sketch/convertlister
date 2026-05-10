import { ImportProduct } from "../types/import.types";

export class ImportTransformer {

  normalize(product: ImportProduct) {
    return {
      ...product,
      title: product.title.trim(),
      price: Number(product.price),
      timestamp: Date.now(),
    };
  }
}
