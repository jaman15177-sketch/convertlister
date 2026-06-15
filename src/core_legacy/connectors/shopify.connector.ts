import { IConnector, RawProduct } from "./types";

export class ShopifyConnector
  implements IConnector
{
  name = "shopify" as const;

  async fetchProducts(): Promise<
    RawProduct[]
  > {
    // MOCK (replace with real API later)
    return [
      {
        source: "shopify",
        sourceProductId: "sh_001",
        importedAt: new Date(),
        payload: {
          id: "sh_001",
          title: "Shopify Product",
          price: 99,
        },
      },
    ];
  }

  async fetchProductById(
    id: string
  ): Promise<RawProduct | null> {
    return {
      source: "shopify",
      sourceProductId: id,
      importedAt: new Date(),
      payload: {
        id,
        title: "Single Shopify Product",
        price: 120,
      },
    };
  }
}
