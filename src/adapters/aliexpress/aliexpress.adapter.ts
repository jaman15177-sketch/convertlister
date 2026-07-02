import type {
  AdapterContract,
  AdapterResult,
  AdapterProduct,
  AdapterQuery
} from "@/adapters/core/adapter.contract";

export class AliExpressAdapter implements AdapterContract<AdapterQuery, AdapterProduct[]> {
  name = "aliexpress";

  transform(input: AdapterQuery): AdapterQuery {
    return {
      keyword: input.keyword.trim(),
      page: input.page ?? 1,
    };
  }

  async execute(input: AdapterQuery): Promise<AdapterResult<AdapterProduct[]>> {
    const raw = await this.fakeFetch(input);

    const products: AdapterProduct[] = raw.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: Number(item.price || 0),
      currency: "USD",
      source: this.name,
      images: item.image ? [item.image] : [],
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
        id: "ae-1",
        title: `AliExpress ${input.keyword}`,
        price: 10,
        image: "",
      },
    ];
  }
}
