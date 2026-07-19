/**
 * ==========================================================
 * WINNING TELEMETRY
 * ==========================================================
 *
 * Enterprise Winning Runtime Telemetry
 *
 * Responsibilities:
 * - Track winning pipeline runtime
 * - Collect processing counters
 * - Measure execution performance
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No business logic
 * - Runtime observation only
 * ==========================================================
 */



/* ==========================================================
 * TELEMETRY TYPES
 * ==========================================================
 */

export interface WinningTelemetry {

  readonly executions: number;

  readonly processedProducts: number;

  readonly successfulRuns: number;

  readonly failedRuns: number;

  readonly totalDurationMs: number;

  readonly averageDurationMs: number;

  readonly lastExecutionAt?: Date;

}



/* ==========================================================
 * TELEMETRY COLLECTOR
 * ==========================================================
 */

export class WinningTelemetryCollector {


  private executions = 0;


  private processedProducts = 0;


  private successfulRuns = 0;


  private failedRuns = 0;


  private totalDurationMs = 0;


  private lastExecutionAt?: Date;



  /**
   * Record successful execution
   */

  recordSuccess(
    products: number,
    durationMs: number
  ): void {


    this.executions++;

    this.processedProducts +=
      products;

    this.successfulRuns++;

    this.totalDurationMs +=
      durationMs;

    this.lastExecutionAt =
      new Date();

  }



  /**
   * Record failed execution
   */

  recordFailure(): void {


    this.executions++;

    this.failedRuns++;

    this.lastExecutionAt =
      new Date();

  }



  /**
   * Read metrics
   */

  getMetrics(): WinningTelemetry {


    return {

      executions:
        this.executions,


      processedProducts:
        this.processedProducts,


      successfulRuns:
        this.successfulRuns,


      failedRuns:
        this.failedRuns,


      totalDurationMs:
        this.totalDurationMs,


      averageDurationMs:
        this.executions === 0
          ? 0
          :
            this.totalDurationMs /
            this.successfulRuns,


      lastExecutionAt:
        this.lastExecutionAt,

    };

  }



  /**
   * Reset telemetry
   */

  reset(): void {

    this.executions = 0;

    this.processedProducts = 0;

    this.successfulRuns = 0;

    this.failedRuns = 0;

    this.totalDurationMs = 0;

    this.lastExecutionAt =
      undefined;

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningTelemetry =
  new WinningTelemetryCollector();
