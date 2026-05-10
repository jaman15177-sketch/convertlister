import { Product } from "../../product.model";

export interface MarketplacePlugin {
  name: string;

  adapter: {
    normalize(raw: any): Product;
  };

  behavior: {
    titleStyle: string;
    bulletStyle: string;
    pricingStrategy: string;
  };
}
