/**
 * ==========================================================
 * WINNING AUDIT
 * ==========================================================
 *
 * Enterprise Winning Audit Trail
 *
 * Responsibilities:
 * - Track winning decisions
 * - Record detection history
 * - Provide traceability
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No mutation of products
 * ==========================================================
 */



import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * AUDIT TYPES
 * ==========================================================
 */

export type WinningAuditAction =
  | "DETECTED"
  | "ACCEPTED"
  | "REJECTED"
  | "RANKED";



export interface WinningAuditRecord {

  readonly id: string;

  readonly candidateId: string;

  readonly productId: string;

  readonly action:
    WinningAuditAction;

  readonly score: number;

  readonly confidence: number;

  readonly timestamp: Date;

}



/* ==========================================================
 * AUDIT ENGINE
 * ==========================================================
 */

export class WinningAuditEngine {



  /**
   * Create audit record
   */

  static create(
    candidate: WinningCandidate,
    action: WinningAuditAction
  ): WinningAuditRecord {


    return {


      id:
        crypto.randomUUID(),


      candidateId:
        candidate.id,


      productId:
        candidate.product.id,


      action,


      score:
        candidate.score,


      confidence:
        candidate.confidence,


      timestamp:
        new Date(),


    };

  }



  /**
   * Create batch audit
   */

  static createMany(
    candidates:
      readonly WinningCandidate[],
    action: WinningAuditAction
  ):
    readonly WinningAuditRecord[] {


    return candidates.map(
      candidate =>
        this.create(
          candidate,
          action
        )
    );

  }



}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningAudit =
  WinningAuditEngine;
