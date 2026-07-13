/**
 * ==========================================================
 * PRODUCT PERSISTENCE CONTRACT
 * ==========================================================
 *
 * Enterprise Product Persistence Contract
 *
 * Responsibilities:
 * - Define persistence service boundary
 * - Define batch persistence workflow
 * - Define transaction workflow
 * - Keep implementation independent
 *
 * Rules:
 * - No business logic
 * - No persistence implementation
 * - Interface only
 * ==========================================================
 */

import type {
  ProductPersistenceRequest,
  ProductBatchPersistenceRequest,
  ProductPersistenceResult,
  ProductBatchPersistenceResult,
  ProductPersistenceTransactionResult,
  ProductPersistenceMetrics,
} from "./product.persistence.types";

/* ==========================================================
 * PRODUCT PERSISTENCE CONTRACT
 * ==========================================================
 */

export interface ProductPersistenceContract {

  /**
   * Persist one product
   */
  persist(
    request: ProductPersistenceRequest
  ): Promise<ProductPersistenceResult>;

  /**
   * Persist multiple products
   */
  persistBatch(
    request: ProductBatchPersistenceRequest
  ): Promise<ProductBatchPersistenceResult>;

  /**
   * Execute inside transaction
   */
  executeTransaction(
    operation: () => Promise<void>
  ): Promise<ProductPersistenceTransactionResult>;

  /**
   * Persistence metrics
   */
  getMetrics(): ProductPersistenceMetrics;

  /**
   * Reset metrics
   */
  resetMetrics(): void;

}
