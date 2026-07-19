import type { NormalizedProduct } from "@/core/normalization/normalizer.types";

export interface Adapter {
  fetchProducts(limit?: number): Promise<NormalizedProduct[]>;
}
