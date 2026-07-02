import type { AdapterContract, AdapterResult, AdapterProduct, AdapterQuery } from "../core/adapter.contract";

export class ShopifyAdapter implements AdapterContract<AdapterQuery, AdapterProduct[]> {
  name = "shopify";

  transform(input: AdapterQuery): AdapterQuery {
    return {
      keyword: input.keyword.trim(),
      page: input.page ?? 1,
      filters: input.filters ?? {},
    };
  }

  async execute(input: AdapterQuery): Promise<AdapterResult<AdapterProduct[]>> {
    const raw = await this.fakeFetch(input);

    const products: AdapterProduct[] = raw.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: Number(p.price || 0),
      currency: "USD",
      source: this.name,
      images: [],
      metadata: {},
    }));

    return {
      success: true,
      data: products,
      source: this.name,
      timestamp: Date.now(),
    };
  }

  private async fakeFetch(input: AdapterQuery) {
    return [
      {
        id: "shop-1",
        title: `Shopify ${input.keyword}`,
        price: 40,
      },
    ];
  }
}
