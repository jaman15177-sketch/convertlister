import { ImportProduct } from "../types/import.types";

export class ImportValidator {

  validate(product: ImportProduct) {
    const errors: string[] = [];

    if (!product.title) errors.push("Missing title");

    if (typeof product.price !== "number" || product.price <= 0) {
      errors.push("Invalid price");
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
