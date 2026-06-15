import { ProductContract } from "@/core/contracts/product.contract";

export class ValidationPipeline {
  validate(product: any) {
    const parsed = ProductContract.safeParse(product);

    if (!parsed.success) {
      throw new Error(
        "INVALID_PRODUCT: " + JSON.stringify(parsed.error.flatten())
      );
    }

    return parsed.data;
  }
}

export const validationPipeline = new ValidationPipeline();
