/**
 * ==========================================================
 * WINNING INDEX
 * ==========================================================
 *
 * Enterprise Winning Module Export
 *
 * Responsibilities:
 * - Public exports
 * - Module boundary control
 * - Prevent internal dependency leaks
 *
 * Rules:
 * - No logic
 * - No state
 * - No repository
 * ==========================================================
 */



/* ==========================================================
 * TYPES
 * ==========================================================
 */

export type {
  WinningCandidate,
} from "./winning.types";



export type {
  WinningExplanation,
} from "./winning.explanation";



export type {
  WinningScoreResult,
} from "./winning.score";



export type {
  WinningStatistics,
} from "./winning.statistics";



export type {
  WinningTelemetry,
} from "./winning.telemetry";



export type {
  WinningHealth,
  WinningHealthStatus,
} from "./winning.health";



export type {
  WinningEvent,
  WinningEventType,
} from "./winning.events";



export type {
  WinningReport,
} from "./winning.report";



/* ==========================================================
 * ENGINES
 * ==========================================================
 */

export {
  WinningEngine,
  winningEngine,
} from "./winning.engine";



export {
  WinningDetector,
  winningDetector,
} from "./winning.detector";



export {
  WinningScoreEngine,
  winningScore,
} from "./winning.score";



export {
  WinningRankingEngine,
  winningRanking,
} from "./winning.ranking";



export {
  WinningStatisticsEngine,
  winningStatistics,
} from "./winning.statistics";



export {
  WinningTelemetryCollector,
  winningTelemetry,
} from "./winning.telemetry";



export {
  WinningAuditEngine,
  winningAudit,
} from "./winning.audit";



export {
  WinningEventFactory,
  winningEvents,
} from "./winning.events";



export {
  WinningHealthEngine,
  winningHealth,
} from "./winning.health";



export {
  WinningCacheEngine,
  winningCache,
} from "./winning.cache";



export {
  WinningReportEngine,
  winningReport,
} from "./winning.report";



/* ==========================================================
 * CONFIG / CONSTANTS
 * ==========================================================
 */

export * from "./winning.constants";

export * from "./winning.config";
