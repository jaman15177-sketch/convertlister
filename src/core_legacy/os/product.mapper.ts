import { UnifiedProduct } from "./multi-market-intelligence.os";

export interface TrendInput {
  productId: string;
  title: string;
  price: number;
  category?: string;
}

export interface MarketFitInput {
  title: string;
  price: number;
  category?: string;
  imagesCount?: number;
  descriptionLength?: number;
}

export class ProductMapper {
  static toTrendInput(
    p: UnifiedProduct
  ): TrendInput {
    return {
      productId: p.sourceProductId,
      title: p.title,
      price: p.price,
      category:
        p.metadata?.category,
    };
  }

  static toMarketFitInput(
    p: UnifiedProduct
  ): MarketFitInput {
    return {
      title: p.title,
      price: p.price,
      category:
        p.metadata?.category,
      imagesCount:
        p.metadata?.imagesCount,
      descriptionLength:
        p.metadata
          ?.descriptionLength,
    };
  }
}
