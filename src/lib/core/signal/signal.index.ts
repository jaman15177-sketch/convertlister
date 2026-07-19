/**
 * ==========================================================
 * SIGNAL INDEX
 * ==========================================================
 *
 * Enterprise Signal Public Export
 *
 * Responsibilities:
 * - Expose public signal APIs
 * - Hide internal module structure
 *
 * Rules:
 * - No implementation
 * - No business logic
 * ==========================================================
 */



/* ==========================================================
 * TYPES
 * ==========================================================
 */

export type {
  SignalStatus,
  AIReadyStatus,
  SignalMetrics,
  SignalResult,
} from "./signal.types";



/* ==========================================================
 * CONTRACTS
 * ==========================================================
 */

export type {
  SignalEngineContract,
  SignalServiceContract,
  SignalValidatorContract,
} from "./signal.contract";



/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export {
  SignalEngine,
  signalEngine,
} from "./signal.engine";



/* ==========================================================
 * METRICS
 * ==========================================================
 */

export {
  signalMetrics,
} from "./signal.metrics";



/* ==========================================================
 * VALIDATOR
 * ==========================================================
 */

export {
  signalValidator,
} from "./signal.validator";



/* ==========================================================
 * REPORT
 * ==========================================================
 */

export {
  signalReport,
} from "./signal.report";



/* ==========================================================
 * MAPPER
 * ==========================================================
 */

export {
  signalMapper,
} from "./signal.mapper";



/* ==========================================================
 * AI READY
 * ==========================================================
 */

export {
  signalAIReady,
} from "./signal.ai-ready";
