import {
  NormalizedProduct,
  ProductNormalizer,
  RawProduct,
} from "../types/import.types";

/**
 * Shopify payload shape
 * Only fields needed by Universal Store
 */
type ShopifyProductPayload = {
  id: string | number;

  title?: string;

  body_html?: string;

  handle?: string;

  status?: string;

  variants?: Array<{
    price?: string;
  }>;

  images?: Array<{
    src?: string;
  }>;
};

export class ShopifyNormalizer
  implements ProductNormalizer
{
  async normalize(
    raw: RawProduct
  ): Promise<NormalizedProduct> {
    const payload =
      raw.payload as ShopifyProductPayload;

    const price =
      payload.variants?.[0]?.price ?? "0";

    const images =
      payload.images
        ?.map((img) => img.src)
        .filter(
          (src): src is string =>
            typeof src === "string" &&
            src.length > 0
        ) ?? [];

    const now = new Date();

    return {
      id: crypto.randomUUID(),

      source: "shopify",

      sourceProductId: String(payload.id),

      version: 1,

      title: payload.title ?? "",

      description: payload.body_html ?? "",

      price: Number(price),

      currency: "USD",

      images,

      status: "imported",

      intelligence: {
        category: "unknown",

        marketFitScore: 0,

        trendScore: 0,

        winningProbability: 0,
      },

      metadata: {
        handle: payload.handle,
        shopifyStatus: payload.status,
      },

      createdAt: now,

      updatedAt: now,
    };
  }
}

export const shopifyNormalizer =
  new ShopifyNormalizer();
