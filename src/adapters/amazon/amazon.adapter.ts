import type {
  AdapterContract,
  AdapterResult,
  AdapterProduct
} from "@/adapters/core/adapter.contract";

interface AmazonQuery {
  keyword: string;
}

export class AmazonAdapter implements AdapterContract<AmazonQuery, AdapterProduct[]> {
  name = "amazon";

  transform(input: AmazonQuery): AmazonQuery {
    return {
      keyword: input.keyword.trim()
    };
  }

  async execute(input: AmazonQuery): Promise<AdapterResult<AdapterProduct[]>> {
    const products: AdapterProduct[] = [
      {
        id: "amz-1",
        title: `Amazon ${input.keyword}`,
        price: 20,
        currency: "USD",
        source: this.name,
        images: [],
        metadata: {}
      }
    ];

    return {
      success: true,
      data: products,
      source: this.name,
      timestamp: Date.now()
    };
  }
}
