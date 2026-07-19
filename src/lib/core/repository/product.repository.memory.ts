/**
 * ==========================================================
 * PRODUCT REPOSITORY (MEMORY)
 * ==========================================================
 *
 * In-memory repository implementation.
 *
 * Responsibilities:
 * - Repository abstraction
 * - UniversalStore delegation
 *
 * Rules:
 * - No business logic
 * - No transformation
 * - No persistence logic
 * ==========================================================
 */


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


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
    new UniversalStore<NormalizedProduct>();



  async create(
    entity: UniversalEntity<NormalizedProduct>
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    return this.store.create(entity);

  }



  async update(
    entity: UniversalEntity<NormalizedProduct>
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    return this.store.update(entity);

  }



  async upsert(
    entity: UniversalEntity<NormalizedProduct>
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    return this.store.upsert(entity);

  }



  async findById(
    id: string
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    return this.store.findById(id);

  }



  async find(
    query?: UniversalQuery
  ):
  Promise<
    UniversalStoreResult<
      readonly UniversalEntity<NormalizedProduct>[]
    >
  > {

    return this.store.find(
      query ?? {}
    );

  }



  async delete(
    id: string
  ):
  Promise<
    UniversalStoreResult<boolean>
  > {

    return this.store.delete(id);

  }



  async exists(
    id: string
  ): Promise<boolean> {

    return this.store.exists(id);

  }



  async findBySku(
    sku: string
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    const result =
      await this.find();



    const product =
      result.data.find(
        item =>
          item.data.sku === sku
      );



    return {

      success: Boolean(product),

      data:
        product as UniversalEntity<NormalizedProduct>

    };

  }



  async findByExternalId(
    externalId: string
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  > {

    const result =
      await this.find();



    const product =
      result.data.find(
        item =>
          item.data.metadata?.externalId === externalId
      );



    return {

      success: Boolean(product),

      data:
        product as UniversalEntity<NormalizedProduct>

    };

  }



  async findProducts(
    _filter?: ProductRepositoryFilter
  ):
  Promise<
    UniversalStoreResult<
      readonly UniversalEntity<NormalizedProduct>[]
    >
  > {

    return this.find();

  }


}



export const productRepository =
  new MemoryProductRepository();
