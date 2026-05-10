import { Product } from "../product.model";

export class PricingEngine {
  calculate(product: Product) {
    const cost = product.cost ?? product.price * 0.6;

    return {
      suggestedPrice: Math.round(cost * 2.2),
      strategy: "premium",
    };
  }
}
