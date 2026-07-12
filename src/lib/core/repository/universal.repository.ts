/**
 * ==========================================================
 * UNIVERSAL REPOSITORY
 * ==========================================================
 *
 * Base repository implementation.
 *
 * Responsibilities:
 * - Generic persistence abstraction
 * - Entity CRUD workflow
 * - Storage adapter boundary
 *
 * Rules:
 * - No database dependency
 * - No ORM dependency
 * - Extendable by domain repositories
 * ==========================================================
 */


import type {
  Repository,
} from "./repository.interface";




import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "../store/universal.types";



/* ==========================================================
 * UNIVERSAL REPOSITORY
 * ========================================================== */

export abstract class UniversalRepository<
  T = unknown
>
implements Repository<T> {



  /**
   * Create entity
   */

  abstract create(
    entity:
      UniversalEntity<T>
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<T>
      >
    >;



  /**
   * Find by id
   */

  abstract findById(
    id: string
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<T>
      >
    >;



  /**
   * Find collection
   */

  abstract find(
  query?: UniversalQuery
):
Promise<
  UniversalStoreResult<
    readonly UniversalEntity<T>[]
  >
>;



  /**
   * Update entity
   */

  abstract update(
    entity:
      UniversalEntity<T>
  ):
    Promise<
      UniversalStoreResult<
        UniversalEntity<T>
      >
    >;

/**
 * Create or Update
 */

abstract upsert(
  entity:
    UniversalEntity<T>
):
Promise<
  UniversalStoreResult<
    UniversalEntity<T>
  >
>;

  /**
   * Delete entity
   */

  abstract delete(
    id: string
  ):
    Promise<
      UniversalStoreResult<boolean>
    >;



  /**
   * Exists check
   */

  async exists(
    id: string
  ): Promise<boolean> {


    const result =
      await this.findById(id);



    return (
      result.success &&
      Boolean(result.data)
    );

  }

}
