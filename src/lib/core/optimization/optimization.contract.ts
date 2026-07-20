/**
 * ==========================================================
 * AI OPTIMIZATION CONTRACT
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Public interfaces
 * - Engine boundary
 * - Service boundary
 * - Repository boundary
 *
 * Rules:
 * - Interface only
 * - No implementation
 * - No AI execution
 * - No quality decision
 * - No approval logic
 *
 * Flow:
 *
 * Winning Product
 *        ↓
 * Optimization Engine
 *        ↓
 * Quality Engine
 *        ↓
 * Approval Gate
 *
 * ==========================================================
 */


import type {
  OptimizationRequest,
  OptimizationResult,
} from "./optimization.types";



/* ==========================================================
 * ENGINE CONTRACT
 * ==========================================================
 */

export interface OptimizationEngineContract {


  optimize(
    request:
      OptimizationRequest
  ):
    Promise<OptimizationResult>;



  optimizeMany(
    requests:
      readonly OptimizationRequest[]
  ):
    Promise<
      readonly OptimizationResult[]
    >;


}



/* ==========================================================
 * SERVICE CONTRACT
 * ==========================================================
 */

export interface OptimizationServiceContract {


  generate(
    request:
      OptimizationRequest
  ):
    Promise<OptimizationResult>;



  generateMany(
    requests:
      readonly OptimizationRequest[]
  ):
    Promise<
      readonly OptimizationResult[]
    >;


}



/* ==========================================================
 * VALIDATOR CONTRACT
 * ==========================================================
 */

export interface OptimizationValidatorContract {


  validate(
    result:
      OptimizationResult
  ):
    void;


}



/* ==========================================================
 * REPOSITORY CONTRACT
 * ==========================================================
 */

export interface OptimizationRepositoryContract {


  save(
    result:
      OptimizationResult
  ):
    Promise<void>;



  findById(
    id:
      string
  ):
    Promise<
      OptimizationResult | null
    >;



  findAll():
    Promise<
      readonly OptimizationResult[]
    >;



  delete(
    id:
      string
  ):
    Promise<void>;


}



/* ==========================================================
 * AI PROVIDER CONTRACT
 * ==========================================================
 *
 * Future:
 * - OpenAI
 * - Claude
 * - Gemini
 * - Local Model
 *
 * ==========================================================
 */

export interface OptimizationAIContract {


  generate(
    request:
      OptimizationRequest
  ):
    Promise<OptimizationResult>;


}
