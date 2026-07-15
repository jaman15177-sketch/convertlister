/**
 * ==========================================================
 * ADAPTER TELEMETRY
 * ==========================================================
 *
 * Observability layer for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Track adapter execution
 * • Track success/failure
 * • Measure latency
 * • Provide metrics hooks
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Store business data
 * ✗ Modify products
 * ✗ Handle marketplace logic
 * ==========================================================
 */


/**
 * Telemetry Event
 */
export interface AdapterTelemetryEvent {

  adapter: string;

  action: string;

  success: boolean;

  duration: number;

  timestamp: number;

  error?: string;

}


/**
 * Adapter Telemetry Service
 */
export class AdapterTelemetry {


  private events:
    AdapterTelemetryEvent[] = [];


  /**
   * Record execution event
   */
  public record(
    event: AdapterTelemetryEvent
  ): void {

    this.events.push(
      event
    );

  }



  /**
   * Start timer
   */
  public start(): number {

    return Date.now();

  }



  /**
   * Calculate duration
   */
  public duration(
    startTime: number
  ): number {

    return Date.now() - startTime;

  }



  /**
   * Get telemetry events
   */
  public getEvents():
    AdapterTelemetryEvent[] {

    return [
      ...this.events
    ];

  }



  /**
   * Clear telemetry
   */
  public clear(): void {

    this.events = [];

  }

}


export const adapterTelemetry =
  new AdapterTelemetry();
