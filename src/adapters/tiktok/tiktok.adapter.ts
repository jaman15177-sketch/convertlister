import type { AdapterContract, AdapterResult, AdapterProduct, AdapterQuery } from "../core/adapter.contract";

export class TikTokAdapter implements AdapterContract<AdapterQuery, AdapterProduct[]> {
  name = "tiktok";

  transform(input: AdapterQuery): AdapterQuery {
    return {
      keyword: input.keyword.trim(),
      page: input.page ?? 1,
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
      metadata: { viral: true },
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
        id: "tt-1",
        title: `TikTok ${input.keyword}`,
        price: 15,
      },
    ];
  }
}
