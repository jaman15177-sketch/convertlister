import type { AdapterContract, AdapterResult, AdapterProduct, AdapterQuery } from "../core/adapter.contract";

export class CustomMarketAdapter implements AdapterContract<AdapterQuery, AdapterProduct[]> {
  name = "custom";

  transform(input: AdapterQuery): AdapterQuery {
    return input;
  }

  async execute(input: AdapterQuery): Promise<AdapterResult<AdapterProduct[]>> {
    const raw = await this.fakeFetch(input);

    const products: AdapterProduct[] = raw.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: Number(p.price || 0),
      currency: "USD",
      source: this.name,
      images: p.image ? [p.image] : [],
      metadata: p.metadata || {},
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
        id: "c-1",
        title: `Custom ${input.keyword}`,
        price: 99,
        image: "",
      },
    ];
  }
}
