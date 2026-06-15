export type ProductSource =
  | "shopify"
  | "amazon"
  | "etsy"
  | "csv"
  | "api"
  | "aliexpress"
  | "tiktok";

export type ProductStatus =
  | "imported"
  | "processing"
  | "analyzed"
  | "optimized"
  | "distributed"
  | "archived"
  | "published";

export interface ProductIntelligence {
  category?: string;
  marketFitScore?: number;
  trendScore?: number;
  winningProbability?: number;
  score?: number;
}

export interface ProductRecord {
  id: string;

  source: ProductSource;
  sourceProductId: string;

  version: number;

  title: string;
  description?: string;

  price: number;
  currency: string;

  images: string[];

  status: ProductStatus;

  intelligence?: ProductIntelligence;

  metadata?: Record<string, unknown>;

  createdAt: Date;
  updatedAt: Date;
}
