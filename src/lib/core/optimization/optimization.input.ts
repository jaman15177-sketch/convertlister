/**
 * ==========================================================
 * AI OPTIMIZATION INPUT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Engine input model
 * - Immutable optimization request
 * - Winning + Signal boundary
 *
 * Rules:
 * - No AI execution
 * - No quality logic
 * - No approval logic
 * - Immutable only
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "@/lib/core/winning/winning.types";

import type {
  SignalResult,
} from "@/lib/core/signal/signal.types";

import type {
  OptimizationType,
} from "./optimization.types";


/* ==========================================================
 * OPTIMIZATION INPUT
 * ==========================================================
 */

export interface OptimizationInput {

  /**
   * Winning Engine output
   */
  readonly winning:
    WinningCandidate;

  /**
   * Signal Engine output
   *
   * Only GREEN products
   * should reach Optimization Engine.
   */
  readonly signal:
    SignalResult;

  /**
   * Requested optimization scope
   */
  readonly optimizationTypes:
    readonly OptimizationType[];

  /**
   * Marketplace
   */
  readonly marketplace:
    string;

  /**
   * Language
   */
  readonly language:
    string;

  /**
   * Correlation / Trace ID
   */
  readonly requestId:
    string;

  /**
   * Request timestamp
   */
  readonly requestedAt:
    Date;

}
