/**
 * ==========================================================
 * PRODUCT PERSISTENCE TRANSACTION ENGINE
 * ==========================================================
 *
 * Enterprise Transaction Coordinator
 *
 * Responsibilities
 * - Transaction orchestration
 * - Commit / Rollback workflow
 * - Failure isolation
 * - Future database transaction boundary
 *
 * Future Support
 * - Supabase Transaction
 * - PostgreSQL Transaction
 * - Distributed Transaction
 * - Queue Transaction
 *
 * Rules
 * - No repository logic
 * - No business logic
 * - No mapping logic
 * - Orchestration only
 * ==========================================================
 */

import type {
  ProductPersistenceTransactionResult,
} from "./product.persistence.types";

import {
  ProductPersistenceTransactionError,
} from "./product.persistence.errors";

/* ==========================================================
 * TRANSACTION CALLBACK
 * ==========================================================
 */

export type ProductPersistenceTransactionCallback =
  () => Promise<void>;

/* ==========================================================
 * PRODUCT PERSISTENCE TRANSACTION
 * ==========================================================
 */

export class ProductPersistenceTransaction {

  /* ========================================================
   * EXECUTE
   * ========================================================
   */

  async execute(
    callback:
      ProductPersistenceTransactionCallback
  ): Promise<
    ProductPersistenceTransactionResult
  > {

    try {

      await callback();

      return {

        success: true,

        committed: true,

        rolledBack: false,

      };

    } catch (error) {

      throw new ProductPersistenceTransactionError(

        error instanceof Error
          ? error.message
          : "Transaction failed."

      );

    }

  }

  /* ========================================================
   * SAFE EXECUTE
   * ========================================================
   */

  async safeExecute(
    callback:
      ProductPersistenceTransactionCallback
  ): Promise<
    ProductPersistenceTransactionResult
  > {

    try {

      return await this.execute(
        callback
      );

    } catch (error) {

      return {

        success: false,

        committed: false,

        rolledBack: true,

        message:
          error instanceof Error
            ? error.message
            : "Transaction rolled back.",

      };

    }

  }

}
