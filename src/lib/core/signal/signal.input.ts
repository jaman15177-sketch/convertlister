/**
 * ==========================================================
 * SIGNAL INPUT
 * ==========================================================
 *
 * Enterprise Signal Input Model
 *
 * Responsibilities:
 * - Define Signal Engine input boundary
 * - Receive Winning Engine output
 * - Prepare clean signal evaluation data
 *
 * Rules:
 * - No calculation
 * - No scoring
 * - No decision logic
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "../winning/winning.types";



/* ==========================================================
 * SIGNAL INPUT
 * ==========================================================
 */

export interface SignalInput {


  readonly productId:
    string;


  readonly score:
    number;


  readonly confidence:
    number;


  readonly winner:
    boolean;


  readonly reasons:
    readonly string[];


}



/* ==========================================================
 * MAPPER
 * ==========================================================
 *
 * WinningCandidate
 *          ↓
 * SignalInput
 *
 * ==========================================================
 */

export class SignalInputMapper {


  static fromWinningCandidate(
    candidate:
      WinningCandidate
  ): SignalInput {


    return {


      productId:
        candidate.id,


      score:
        candidate.score,


      confidence:
        candidate.confidence,


      winner:
        candidate.winner,


      reasons:
        candidate.reasons,


    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalInput =
  SignalInputMapper;
