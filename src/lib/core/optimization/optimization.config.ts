/**
 * ==========================================================
 * AI OPTIMIZATION CONFIG
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Engine configuration
 * - Runtime configuration
 * - AI provider configuration
 *
 * Rules:
 * - Configuration only
 * - No AI execution
 * - No business logic
 * - No quality logic
 * - No approval logic
 * ==========================================================
 */

import {

  DEFAULT_AI_PROVIDER,
  DEFAULT_BATCH_SIZE,
  DEFAULT_LANGUAGE,
  DEFAULT_MARKETPLACE,
  MAX_AI_RETRY,

} from "./optimization.constants";


/* ==========================================================
 * CONFIG TYPE
 * ==========================================================
 */

export interface OptimizationConfig {

  readonly provider:
    string;

  readonly language:
    string;

  readonly marketplace:
    string;

  readonly batchSize:
    number;

  readonly retryAttempts:
    number;

  readonly timeoutMs:
    number;

  readonly enableLogging:
    boolean;

  readonly enableCaching:
    boolean;

}


/* ==========================================================
 * DEFAULT CONFIG
 * ==========================================================
 */

export const optimizationConfig:
  OptimizationConfig = {

  provider:
    DEFAULT_AI_PROVIDER,

  language:
    DEFAULT_LANGUAGE,

  marketplace:
    DEFAULT_MARKETPLACE,

  batchSize:
    DEFAULT_BATCH_SIZE,

  retryAttempts:
    MAX_AI_RETRY,

  timeoutMs:
    60_000,

  enableLogging:
    true,

  enableCaching:
    true,

};


/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export default optimizationConfig;
