export interface NormalizedProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  source: string;
  sourceProductId: string;
}

export interface Adapter {
  fetchProducts(limit?: number): Promise<NormalizedProduct[]>;
}
