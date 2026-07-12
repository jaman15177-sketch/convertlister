/**
 * ==========================================================
 * UNIVERSAL STORE SERVICE
 * ==========================================================
 *
 * Application service layer for Universal Store.
 *
 * Responsibilities:
 * - Business workflow orchestration
 * - Store interaction
 * - Validation boundary
 * - Future extension point
 *
 * Rules:
 * - No database code
 * - No API code
 * - No queue code
 * - Uses Store contract only
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


/* ==========================================================
 * UNIVERSAL SERVICE
 * ========================================================== */

export class UniversalService<T = unknown> {


  constructor(
    private readonly store:
      UniversalStoreContract<T>
  ) {}



  /* ========================================================
   * CREATE
   * ======================================================== */

  async create(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    return this.store.create(
      entity
    );
  }



  /* ========================================================
   * GET BY ID
   * ======================================================== */

  async get(
    id: string
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    return this.store.findById(
      id
    );
  }



  /* ========================================================
   * SEARCH
   * ======================================================== */

  async search(
    query: UniversalQuery
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<T>[]
    >
  > {

    return this.store.find(
      query
    );
  }



  /* ========================================================
   * UPDATE
   * ======================================================== */

  async update(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<UniversalEntity<T>>
  > {

    return this.store.update(
      entity
    );
  }



  /* ========================================================
   * DELETE
   * ======================================================== */

  async remove(
    id: string
  ): Promise<
    UniversalStoreResult<boolean>
  > {

    return this.store.delete(
      id
    );
  }


}
