/**
 * ==========================================================
 * PRODUCT PERSISTENCE BATCH ENGINE
 * ==========================================================
 *
 * Enterprise Batch Persistence Engine
 *
 * Responsibilities
 * - Batch persistence orchestration
 * - Sequential persistence execution
 * - Result aggregation
 * - Failure isolation
 *
 * Rules
 * - No database logic
 * - No business logic
 * - Repository driven
 * - Stateless
 * ==========================================================
 */

import type {
  ProductPersistenceContract,
} from "./product.persistence.contract";

import type {
  ProductBatchPersistenceRequest,
  ProductBatchPersistenceResult,
  ProductPersistenceResult,
} from "./product.persistence.types";

import {
  ProductPersistenceBatchError,
} from "./product.persistence.errors";

/* ==========================================================
 * PRODUCT PERSISTENCE BATCH
 * ==========================================================
 */

export class ProductPersistenceBatch {

  constructor(
    private readonly persistence:
      ProductPersistenceContract
  ) {}

  /* ========================================================
   * EXECUTE
   * ========================================================
   */

  async execute(
    request:
      ProductBatchPersistenceRequest
  ): Promise<
    ProductBatchPersistenceResult
  > {

    const results:
      ProductPersistenceResult[] = [];

    let inserted = 0;

    let updated = 0;

    let skipped = 0;

    let failed = 0;

    for (const entity of request.entities) {

      try {

        const result =
          await this.persistence.persist({

  organizationId:
    request.organizationId,

  entity,

  mode:
    request.mode,

});

        results.push(
          result
        );

        if (result.created) {

          inserted++;

        }

        if (result.updated) {

          updated++;

        }

        if (result.skipped) {

          skipped++;

        }

      } catch {

        failed++;

      }

    }

    return {

      success:
        failed === 0,

      total:
        request.entities.length,

      inserted,

      updated,

      skipped,

      failed,

      results,

    };

  }

  /* ========================================================
   * SAFE EXECUTE
   * ========================================================
   */

  async safeExecute(
    request:
      ProductBatchPersistenceRequest
  ): Promise<
    ProductBatchPersistenceResult
  > {

    try {

      return await this.execute(
        request
      );

    } catch (error) {

      throw new ProductPersistenceBatchError(

        error instanceof Error
          ? error.message
          : "Batch persistence failed."

      );

    }

  }

}
