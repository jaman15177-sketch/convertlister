/**
 * ==========================================================
 * WINNING EVENTS
 * ==========================================================
 *
 * Enterprise Winning Domain Events
 *
 * Responsibilities:
 * - Define winning lifecycle events
 * - Create event payloads
 * - Enable future event-driven flow
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No queue execution
 * ==========================================================
 */



import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * EVENT TYPES
 * ==========================================================
 */

export type WinningEventType =
  | "WINNING_DETECTED"
  | "WINNING_ACCEPTED"
  | "WINNING_REJECTED"
  | "WINNING_RANKED";



/* ==========================================================
 * EVENT STRUCTURE
 * ==========================================================
 */

export interface WinningEvent {


  readonly id: string;


  readonly type:
    WinningEventType;


  readonly candidateId: string;


  readonly productId: string;


  readonly score: number;


 


  readonly createdAt: Date;


}



/* ==========================================================
 * EVENT FACTORY
 * ==========================================================
 */

export class WinningEventFactory {



  /**
   * Create event
   */

  static create(
    candidate: WinningCandidate,
    type: WinningEventType
  ): WinningEvent {


    return {


      id:
        crypto.randomUUID(),


      type,


      candidateId:
        candidate.id,


      productId:
        candidate.product.id,


      score:
        candidate.score,


      


      createdAt:
        new Date(),


    };

  }



  /**
   * Create batch events
   */

  static createMany(
    candidates:
      readonly WinningCandidate[],
    type: WinningEventType
  ):
    readonly WinningEvent[] {


    return candidates.map(
      candidate =>
        this.create(
          candidate,
          type
        )
    );

  }



}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningEvents =
  WinningEventFactory;
