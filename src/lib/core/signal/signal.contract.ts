/**
 * ==========================================================
 * SIGNAL CONTRACT
 * ==========================================================
 *
 * Enterprise Signal Contracts
 *
 * Responsibilities:
 * - Public subsystem boundary
 * - Engine interface
 * - Service interface
 *
 * Rules:
 * - Interface only
 * - No implementation
 * - No calculation
 * - No decision logic
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "../winning/winning.types";


import type {
  SignalResult,
} from "./signal.types";



/* ==========================================================
 * SIGNAL ENGINE CONTRACT
 * ==========================================================
 */

export interface SignalEngineContract {


  evaluate(
    candidate:
      WinningCandidate
  ): SignalResult;



  evaluateMany(
    candidates:
      readonly WinningCandidate[]
  ): readonly SignalResult[];


}



/* ==========================================================
 * SIGNAL SERVICE CONTRACT
 * ==========================================================
 */

export interface SignalServiceContract {


  analyze(
    candidate:
      WinningCandidate
  ): SignalResult;



  analyzeMany(
    candidates:
      readonly WinningCandidate[]
  ): readonly SignalResult[];


}



/* ==========================================================
 * SIGNAL VALIDATOR CONTRACT
 * ==========================================================
 */

export interface SignalValidatorContract {


  validate(
    result:
      SignalResult
  ): void;


}
