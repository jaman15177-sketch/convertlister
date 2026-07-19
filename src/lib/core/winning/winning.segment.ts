/**
 * ==========================================================
 * WINNING SEGMENT
 * ==========================================================
 *
 * Enterprise Winning Product Segmentation
 *
 * Responsibilities:
 * - Classify winning candidates
 * - Group products by business segment
 * - Prepare signal-ready segmentation
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No scoring logic
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";


export type WinningSegmentType =
  | "TOP_WINNER"
  | "PROMISING"
  | "EXPLORING"
  | "REJECTED";


export interface WinningSegmentResult {

  readonly segment:
    WinningSegmentType;

  readonly score: number;

  readonly reason: string;

}


export interface WinningSegmentGroups {

  readonly topWinners:
    readonly WinningCandidate[];

  readonly promising:
    readonly WinningCandidate[];

  readonly exploring:
    readonly WinningCandidate[];

  readonly rejected:
    readonly WinningCandidate[];

}



export class WinningSegmentEngine {


  static classify(
    candidate: WinningCandidate
  ): WinningSegmentResult {


    const score =
      candidate.score;


    if (score >= 90) {

      return {
        segment: "TOP_WINNER",
        score,
        reason:
          "High winning score detected",
      };

    }


    if (score >= 70) {

      return {
        segment: "PROMISING",
        score,
        reason:
          "Strong winning signals detected",
      };

    }


    if (score >= 40) {

      return {
        segment: "EXPLORING",
        score,
        reason:
          "Needs further evaluation",
      };

    }


    return {
      segment: "REJECTED",
      score,
      reason:
        "Insufficient winning signals",
    };

  }



  static group(
    candidates:
      readonly WinningCandidate[]
  ): WinningSegmentGroups {


    return {

      topWinners:
        candidates.filter(
          candidate =>
            this.classify(candidate)
              .segment === "TOP_WINNER"
        ),


      promising:
        candidates.filter(
          candidate =>
            this.classify(candidate)
              .segment === "PROMISING"
        ),


      exploring:
        candidates.filter(
          candidate =>
            this.classify(candidate)
              .segment === "EXPLORING"
        ),


      rejected:
        candidates.filter(
          candidate =>
            this.classify(candidate)
              .segment === "REJECTED"
        ),

    };

  }


}



export const winningSegment =
  WinningSegmentEngine;
