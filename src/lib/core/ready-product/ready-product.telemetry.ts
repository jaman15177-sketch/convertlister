/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.telemetry.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Telemetry Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Product Metrics
 * ✓ Performance Tracking
 * ✓ Usage Analytics
 * ✓ Monitoring Signals
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Monitoring Provider
 * ✗ API
 *
 * ===========================================================
 */



/**
 * ===========================================================
 * Telemetry Event Types
 * ===========================================================
 */

export const READY_PRODUCT_TELEMETRY_EVENTS = {

  VIEW:
    "VIEW",

  SEARCH:
    "SEARCH",

  PREVIEW:
    "PREVIEW",

  PURCHASE:
    "PURCHASE",

  EXPORT:
    "EXPORT",

  PUBLISH:
    "PUBLISH",

  ERROR:
    "ERROR",

  PERFORMANCE:
    "PERFORMANCE",

} as const;



export type ReadyProductTelemetryEventType =
  typeof READY_PRODUCT_TELEMETRY_EVENTS[
    keyof typeof READY_PRODUCT_TELEMETRY_EVENTS
  ];



/**
 * ===========================================================
 * Metric Type
 * ===========================================================
 */

export const READY_PRODUCT_METRIC_TYPES = {

  COUNTER:
    "COUNTER",

  GAUGE:
    "GAUGE",

  TIMER:
    "TIMER",

} as const;



export type ReadyProductMetricType =
  typeof READY_PRODUCT_METRIC_TYPES[
    keyof typeof READY_PRODUCT_METRIC_TYPES
  ];



/**
 * ===========================================================
 * Telemetry Context
 * ===========================================================
 */

export interface ReadyProductTelemetryContext {


  readonly productId?:
    string;



  readonly organizationId?:
    string;



  readonly userId?:
    string;



  readonly marketplace?:
    string;



  readonly metadata?:
    Record<string, unknown>;

}



/**
 * ===========================================================
 * Telemetry Metric
 * ===========================================================
 */

export interface ReadyProductTelemetryMetric {


  readonly name:
    string;



  readonly type:
    ReadyProductMetricType;



  readonly value:
    number;



  readonly unit?:
    string;



  readonly timestamp:
    string;

}



/**
 * ===========================================================
 * Main Telemetry Record
 * ===========================================================
 */

export interface ReadyProductTelemetryRecord {


  readonly id:
    string;



  readonly event:
    ReadyProductTelemetryEventType;



  readonly context:
    ReadyProductTelemetryContext;



  readonly metrics?:
    readonly ReadyProductTelemetryMetric[];



  readonly createdAt:
    string;

}



/**
 * ===========================================================
 * Telemetry Input
 * ===========================================================
 */

export interface CreateReadyProductTelemetryInput {


  readonly event:
    ReadyProductTelemetryEventType;



  readonly context:
    ReadyProductTelemetryContext;



  readonly metrics?:
    readonly ReadyProductTelemetryMetric[];

}



/**
 * ===========================================================
 * Telemetry Factory
 * ===========================================================
 */

export function createReadyProductTelemetry(

  input:
    CreateReadyProductTelemetryInput,

): ReadyProductTelemetryRecord {


  return {


    id:
      crypto.randomUUID(),


    event:
      input.event,


    context:
      input.context,


    metrics:
      input.metrics,


    createdAt:
      new Date().toISOString(),

  };

}



/**
 * ===========================================================
 * Metric Builder
 * ===========================================================
 */

export function createReadyProductMetric(

  input: {

    name: string;

    type: ReadyProductMetricType;

    value: number;

    unit?: string;

  },

): ReadyProductTelemetryMetric {


  return {


    name:
      input.name,


    type:
      input.type,


    value:
      input.value,


    unit:
      input.unit,


    timestamp:
      new Date().toISOString(),

  };

}



/**
 * ===========================================================
 * Telemetry Guard
 * ===========================================================
 */

export function isReadyProductTelemetry(

  value:
    unknown,

): value is ReadyProductTelemetryRecord {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const telemetry =
    value as Partial<ReadyProductTelemetryRecord>;



  return (

    typeof telemetry.id === "string" &&

    typeof telemetry.event === "string"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function isReadyProductPerformanceMetric(

  metric:
    ReadyProductTelemetryMetric,

): boolean {


  return (

    metric.type ===
      READY_PRODUCT_METRIC_TYPES.TIMER

  );

}



export function hasReadyProductTelemetryMetrics(

  record:
    ReadyProductTelemetryRecord,

): boolean {


  return (

    (record.metrics?.length ?? 0) > 0

  );

}
