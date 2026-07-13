/**
 * ==========================================================
 * PRODUCT PERSISTENCE SERVICE
 * ==========================================================
 *
 * Enterprise Product Persistence Service
 *
 * Responsibilities
 * - Persistence orchestration
 * - Repository coordination
 * - Batch coordination
 * - Transaction boundary
 * - Runtime metrics
 *
 * Rules
 * - No SQL logic
 * - No business logic
 * - No validation logic
 * - Repository driven
 * ==========================================================
 */

import type {
  ProductPersistenceContract,
} from "./product.persistence.contract";

import type {
  ProductPersistenceRequest,
  ProductBatchPersistenceRequest,
  ProductPersistenceResult,
  ProductBatchPersistenceResult,
  ProductPersistenceMetrics,
  ProductPersistenceTransactionResult,
} from "./product.persistence.types";

import {
  ProductPersistenceMapper,
} from "./product.persistence.mapper";

import {
  ProductPersistenceBatch,
} from "./product.persistence.batch";

import {
  ProductPersistenceTransaction,
} from "./product.persistence.transaction";

import {
  ProductPersistenceMetricsEngine,
} from "./product.persistence.metrics";

import {
  ProductPersistenceError,
} from "./product.persistence.errors";

import {
  supabaseProductRepository,
} from "../repository";

/* ==========================================================
 * PRODUCT PERSISTENCE SERVICE
 * ==========================================================
 */

export class ProductPersistenceService
  implements ProductPersistenceContract {

  private readonly metrics =
    new ProductPersistenceMetricsEngine();

  private readonly transaction =
    new ProductPersistenceTransaction();

  private readonly batch =
    new ProductPersistenceBatch(
      this
    );

  /* ========================================================
   * PERSIST
   * ========================================================
   */  async persist(
    request:
      ProductPersistenceRequest
  ): Promise<
    ProductPersistenceResult
  > {

    try {

      const payload =
        ProductPersistenceMapper
          .toCreateInput(
            request.organizationId,
            request.entity
          );

      switch (
        request.mode
      ) {

        case "create":

          await supabaseProductRepository
            .create(
              payload
            );

          break;

        case "update":

          await supabaseProductRepository.update(

  request.entity.id,

  ProductPersistenceMapper.toUpdateInput(

    request.entity

  )

);

          break;

        case "upsert":

          await supabaseProductRepository.upsert(

  ProductPersistenceMapper.toUpsertInput(

    request.organizationId,

    request.entity

  )

);

          break;

        default:

          throw new ProductPersistenceError(
            `Unsupported persistence mode: ${request.mode}`
          );

      }

      const result:
        ProductPersistenceResult = {

        success: true,

        id:
          request.entity.id,

        created:
          request.mode === "create",

        updated:
          request.mode !== "create",

        skipped: false,

      };

      this.metrics.record(
        result
      );

      return result;

    } catch (error) {

      this.metrics.recordFailure();

      throw new ProductPersistenceError(

        error instanceof Error
          ? error.message
          : "Persistence operation failed."

      );

    }

  }

  /* ========================================================
   * PERSIST BATCH
   * ========================================================
   */  async persistBatch(
    request:
      ProductBatchPersistenceRequest
  ): Promise<
    ProductBatchPersistenceResult
  > {

    this.metrics.start();

    return this.batch.execute(
      request
    );

  }

  /* ========================================================
   * TRANSACTION
   * ========================================================
   */
  async executeTransaction(
    operation: () => Promise<void>
  ): Promise<
    ProductPersistenceTransactionResult
  > {

    try {

      return await this.transaction.execute(
        operation
      );

    } catch (error) {

      throw new ProductPersistenceError(

        error instanceof Error
          ? error.message
          : "Transaction execution failed."

      );

    }

  }

  /* ========================================================
   * METRICS
   * ========================================================
   */  getMetrics():
    ProductPersistenceMetrics {

    return this.metrics.snapshot();

  }

  /* ========================================================
   * RESET METRICS
   * ========================================================
   */

  resetMetrics(): void {

    this.metrics.reset();

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const productPersistenceService =
  new ProductPersistenceService();
