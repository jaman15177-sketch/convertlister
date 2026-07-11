import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export type Product = AdapterProduct;

export interface RepositoryStats {
  total: number;
}

export interface RepositoryResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ProductList = Product[];
