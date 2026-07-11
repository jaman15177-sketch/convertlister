import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export interface ProductRepository {
  add(product: AdapterProduct): AdapterProduct;

  upsert(product: AdapterProduct): AdapterProduct;

  upsertMany(
    products: AdapterProduct[]
  ): AdapterProduct[];

  get(id: string): AdapterProduct | undefined;

  has(id: string): boolean;

  remove(id: string): boolean;

  getAll(): AdapterProduct[];

  count(): number;

  clear(): void;
}
