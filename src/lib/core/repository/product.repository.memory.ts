/**
 * ==========================================================
 * PRODUCT REPOSITORY (MEMORY)
 * ==========================================================
 *
 * Default in-memory implementation.
 *
 * Responsibilities
 * - Repository implementation
 * - Delegate persistence to UniversalStore
 *
 * Replace later with:
 * - SupabaseProductRepository
 * - PostgresProductRepository
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import {
  UniversalStore,
} from "../store/universal.store";

import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "../store/universal.types";

import {
  ProductRepository,
} from "./product.repository";

import type {
  ProductRepositoryFilter,
} from "./product.repository.types";

export class MemoryProductRepository
  extends ProductRepository {

  private readonly store =
    new UniversalStore<AdapterProduct>();

  async create(
    entity: UniversalEntity<AdapterProduct>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  > {
    return this.store.create(entity);
  }

  async update(
    entity: UniversalEntity<AdapterProduct>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  > {
    return this.store.update(entity);
  }

  async upsert(
    entity: UniversalEntity<AdapterProduct>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  > {
    return this.store.upsert(entity);
  }

  async findById(
    id: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<AdapterProduct>
    >
  > {
    return this.store.findById(id);
  }

  async find(
    query?: UniversalQuery
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<AdapterProduct>[]
    >
  > {
    return this.store.find(query ?? {});
  }

  async delete(
    id: string
  ): Promise<
    UniversalStoreResult<boolean>
  > {
    return this.store.delete(id);
  }  async exists(
    id: string
  ): Promise<boolean> {

    return this.store.exists(id);

  }

  async findBySku(
  sku: string
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
> {

  const result = await this.find();

  const product = result.data.find(
    item => item.data.sku === sku
  );

  return {
    success: !!product,
    data: product as UniversalEntity<AdapterProduct>,
  };

}

  async findByExternalId(
  externalId: string
): Promise<
  UniversalStoreResult<
    UniversalEntity<AdapterProduct>
  >
> {

  const result = await this.find();

  const product =
  result.data.find(
    item =>
      item.data.metadata?.externalId === externalId
  );

  return {
    success: !!product,
    data: product as UniversalEntity<AdapterProduct>,
  };

}

  async findProducts(
    _filter: ProductRepositoryFilter
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<AdapterProduct>[]
    >
  > {
    return this.find();
  }

}

export const productRepository =
  new MemoryProductRepository();
