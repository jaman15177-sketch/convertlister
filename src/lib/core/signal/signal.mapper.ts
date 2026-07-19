/**
 * ==========================================================
 * SIGNAL MAPPER
 * ==========================================================
 *
 * Enterprise Signal Mapping Layer
 *
 * Responsibilities:
 * - Map domain signal result
 * - Prepare external response format
 *
 * Rules:
 * - No business logic
 * - No calculation
 * - No mutation
 * ==========================================================
 */


import type {
  SignalResult,
} from "./signal.types";



/* ==========================================================
 * API RESPONSE TYPE
 * ==========================================================
 */

export interface SignalResponse {


  readonly productId:
    string;


  readonly signal:
    string;


  readonly optimizeAllowed:
    boolean;


  readonly overall:
    number;


  readonly aiReady:
    string;


  readonly createdAt:
    Date;


}



/* ==========================================================
 * MAPPER
 * ==========================================================
 */

export class SignalMapper {



  static toResponse(
    result:
      SignalResult
  ): SignalResponse {



    return {


      productId:
        result.productId,


      signal:
        result.signal,


      optimizeAllowed:
        result.optimizeAllowed,


      overall:
        result.metrics.overall,


      aiReady:
        result.metrics.aiReady,


      createdAt:
        result.createdAt,


    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalMapper =
  SignalMapper;
