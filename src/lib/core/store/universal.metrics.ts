/**
 * ==========================================================
 * UNIVERSAL METRICS
 * ==========================================================
 *
 * Performance measurement layer.
 *
 * Responsibilities:
 * - Track store operations
 * - Measure execution time
 * - Count success/failure
 * - Provide internal statistics
 *
 * Rules:
 * - No monitoring service dependency
 * - No Prometheus implementation
 * - Export layer can consume later
 * ==========================================================
 */


/* ==========================================================
 * METRIC TYPES
 * ========================================================== */

export interface UniversalMetricRecord {

  readonly operation: string;

  readonly durationMs: number;

  readonly success: boolean;

  readonly timestamp: Date;

}



/* ==========================================================
 * METRIC SUMMARY
 * ========================================================== */

export interface UniversalMetricSummary {

  readonly total: number;

  readonly successful: number;

  readonly failed: number;

  readonly averageDurationMs: number;

}



/* ==========================================================
 * METRICS MANAGER
 * ========================================================== */

export class UniversalMetricsManager {


  private readonly records:
    UniversalMetricRecord[] = [];



  /**
   * Record operation metric
   */

  record(
    operation: string,
    durationMs: number,
    success: boolean
  ): void {

    this.records.push({

      operation,

      durationMs,

      success,

      timestamp:
        new Date(),

    });

  }



  /**
   * Measure async operation
   */

  async measure<T>(
    operation: string,
    callback: () => Promise<T>
  ): Promise<T> {


    const start =
      Date.now();


    try {


      const result =
        await callback();



      this.record(
        operation,
        Date.now() - start,
        true
      );



      return result;


    } catch (error) {


      this.record(
        operation,
        Date.now() - start,
        false
      );


      throw error;

    }

  }



  /**
   * Get metrics summary
   */

  summary():
    UniversalMetricSummary {


    const total =
      this.records.length;



    const successful =
      this.records.filter(
        item => item.success
      ).length;



    const failed =
      total - successful;



    const averageDurationMs =
      total === 0
        ? 0
        :
          this.records.reduce(
            (sum, item) =>
              sum + item.durationMs,
            0
          ) / total;



    return {

      total,

      successful,

      failed,

      averageDurationMs,

    };

  }



  /**
   * Clear metrics
   */

  clear(): void {

    this.records.length = 0;

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalMetrics =
  new UniversalMetricsManager();
