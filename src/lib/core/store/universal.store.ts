/**
 * ==========================================================
 * UNIVERSAL STORE
 * ==========================================================
 *
 * Core in-memory store abstraction for Universal Store.
 *
 * Responsibilities:
 * - Entity lifecycle management
 * - Create / Read / Update / Delete
 * - Store boundary implementation
 *
 * Rules:
 * - No database dependency
 * - No API dependency
 * - No queue dependency
 * - Persistence handled by repository layer
 * ==========================================================
 */

import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "./universal.types";

import type {
  UniversalStoreContract,
} from "./universal.contract";

import {
  UniversalEntityNotFoundError,
} from "./universal.errors";


/* ==========================================================
 * UNIVERSAL STORE IMPLEMENTATION
 * ========================================================== */

export class UniversalStore<T = unknown>
  implements UniversalStoreContract<T>
{

  private readonly storage:
    Map<string, UniversalEntity<T>> =
    new Map();


  /* ========================================================
   * CREATE
   * ======================================================== */

  async create(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    this.storage.set(
      entity.id,
      entity
    );

    return {
      success: true,
      data: entity,
    };
  }


  /* ========================================================
   * FIND BY ID
   * ======================================================== */

  async findById(
    id: string
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    const entity =
      this.storage.get(id);


    if (!entity) {

      throw new UniversalEntityNotFoundError(
        id
      );
    }


    return {
      success: true,
      data: entity,
    };
  }


  /* ========================================================
   * FIND
   * ======================================================== */

  async find(
    query: UniversalQuery
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<T>[]
    >
  > {

    let entities =
      Array.from(
        this.storage.values()
      );


    if (query.limit) {

      entities =
        entities.slice(
          0,
          query.limit
        );
    }


    return {
      success: true,
      data: entities,
    };
  }


  /* ========================================================
   * UPDATE
   * ======================================================== */

  async update(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {


    if (
      !this.storage.has(entity.id)
    ) {

      throw new UniversalEntityNotFoundError(
        entity.id
      );
    }


    this.storage.set(
      entity.id,
      entity
    );


    return {
      success: true,
      data: entity,
    };
  }  /* ========================================================
 * UPSERT
 * ======================================================== */

async upsert(
  entity: UniversalEntity<T>
): Promise<
  UniversalStoreResult<
    UniversalEntity<T>
  >
> {

  this.storage.set(
    entity.id,
    entity
  );

  return {
    success: true,
    data: entity,
  };

}


  /* ========================================================
   * DELETE
   * ======================================================== */

  async delete(
    id: string
  ): Promise<
    UniversalStoreResult<boolean>
  > {


    const deleted =
      this.storage.delete(id);


    return {
      success: true,
      data: deleted,
    };
  }
/* ========================================================
 * EXISTS
 * ======================================================== */

async exists(
  id: string
): Promise<boolean> {

  return this.storage.has(id);

}

  /* ========================================================
   * INTERNAL ACCESS
   * ======================================================== */

  clear(): void {

    this.storage.clear();

  }
/* ========================================================
 * COUNT
 * ======================================================== */

count(): number {

  return this.storage.size;

}



}
/**
 * ==========================================================
 * DEFAULT STORE
 * ==========================================================
 */

export const universalStore =
  new UniversalStore();
