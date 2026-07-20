/**
 * ==========================================================
 * AI OPTIMIZATION QUEUE
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility
 * - Queue abstraction
 * - Batch optimization
 * - Queue orchestration
 *
 * Rules
 * - No BullMQ implementation
 * - No Redis implementation
 * - No AI execution
 * - No quality validation
 * - No approval logic
 * ==========================================================
 */

import type {
  OptimizationInput,
} from "./optimization.input";


/* ==========================================================
 * QUEUE JOB
 * ==========================================================
 */

export interface OptimizationQueueJob {

  readonly id:
    string;

  readonly input:
    OptimizationInput;

  readonly priority:
    number;

  readonly createdAt:
    Date;

}


/* ==========================================================
 * QUEUE CONTRACT
 * ==========================================================
 */

export interface OptimizationQueue {

  enqueue(
    job:
      OptimizationQueueJob
  ): Promise<void>;



  enqueueMany(
    jobs:
      readonly OptimizationQueueJob[]
  ): Promise<void>;

}


/* ==========================================================
 * EXPORT TYPES
 * ==========================================================
 */

export type {
  OptimizationQueueJob as AIOptimizationQueueJob,
};
