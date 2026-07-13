/**
 * ==========================================================
 * PRODUCT PERSISTENCE METRICS
 * ==========================================================
 *
 * Enterprise Product Persistence Metrics
 *
 * Responsibilities
 * - Collect persistence statistics
 * - Runtime metrics
 * - Performance counters
 * - Import statistics
 *
 * Rules
 * - No repository logic
 * - No database logic
 * - No business logic
 * - Runtime metrics only
 * ==========================================================
 */

import type {
  ProductPersistenceMetrics,
  ProductPersistenceResult,
} from "./product.persistence.types";

/* ==========================================================
 * PRODUCT PERSISTENCE METRICS ENGINE
 * ==========================================================
 */

export class ProductPersistenceMetricsEngine {

  private startedAt = 0;

  private processed = 0;

  private inserted = 0;

  private updated = 0;

  private skipped = 0;

  private failed = 0;

  /* ========================================================
   * START
   * ========================================================
   */

  start(): void {

    this.startedAt = Date.now();

    this.processed = 0;

    this.inserted = 0;

    this.updated = 0;

    this.skipped = 0;

    this.failed = 0;

  }

  /* ========================================================
   * RECORD
   * ========================================================
   */

  record(
    result: ProductPersistenceResult
  ): void {

    this.processed++;

    if (result.created) {

      this.inserted++;

    }

    if (result.updated) {

      this.updated++;

    }

    if (result.skipped) {

      this.skipped++;

    }

  }

  /* ========================================================
   * RECORD FAILURE
   * ========================================================
   */

  recordFailure(): void {

    this.processed++;

    this.failed++;

  }

  /* ========================================================
   * SNAPSHOT
   * ========================================================
   */

  snapshot():
    ProductPersistenceMetrics {

    return {

      processed:
        this.processed,

      inserted:
        this.inserted,

      updated:
        this.updated,

      skipped:
        this.skipped,

      failed:
        this.failed,

      durationMs:
        Date.now() -
        this.startedAt,

    };

  }

  /* ========================================================
   * RESET
   * ========================================================
   */

  reset(): void {

    this.startedAt = 0;

    this.processed = 0;

    this.inserted = 0;

    this.updated = 0;

    this.skipped = 0;

    this.failed = 0;

  }

}
