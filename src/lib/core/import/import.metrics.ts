/**
 * ==========================================================
 * IMPORT METRICS
 * ==========================================================
 * Runtime metrics model for Import subsystem.
 *
 * Responsibilities
 * - Performance measurement
 * - Duration calculation
 * - Throughput tracking
 * - Import statistics snapshot
 *
 * No database
 * No telemetry provider
 * No infrastructure
 * ==========================================================
 */


/* ==========================================================
 * IMPORT METRIC RECORD
 * ========================================================== */

export interface ImportMetricsRecord {
  readonly jobId: string;

  readonly startedAt: Date;

  readonly completedAt?: Date;

  readonly durationMs?: number;

  readonly totalProducts: number;

  readonly processedProducts: number;

  readonly importedProducts: number;

  readonly failedProducts: number;

  readonly skippedProducts: number;

  readonly duplicatedProducts: number;

  readonly productsPerSecond?: number;
}


/* ==========================================================
 * METRICS BUILDER
 * ========================================================== */

export class ImportMetricsBuilder {

  start(
    jobId: string,
    totalProducts: number
  ): ImportMetricsRecord {
    return {
      jobId,
      startedAt: new Date(),
      totalProducts,
      processedProducts: 0,
      importedProducts: 0,
      failedProducts: 0,
      skippedProducts: 0,
      duplicatedProducts: 0,
    };
  }


  update(
    metrics: ImportMetricsRecord,
    update: {
      processedProducts?: number;
      importedProducts?: number;
      failedProducts?: number;
      skippedProducts?: number;
      duplicatedProducts?: number;
    }
  ): ImportMetricsRecord {

    return {
      ...metrics,
      ...update,
    };
  }


  complete(
    metrics: ImportMetricsRecord
  ): ImportMetricsRecord {

    const completedAt = new Date();

    const durationMs =
      completedAt.getTime() -
      metrics.startedAt.getTime();


    const productsPerSecond =
      durationMs > 0
        ? Number(
            (
              metrics.processedProducts /
              (durationMs / 1000)
            ).toFixed(2)
          )
        : 0;


    return {
      ...metrics,
      completedAt,
      durationMs,
      productsPerSecond,
    };
  }
}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const importMetrics =
  new ImportMetricsBuilder();
