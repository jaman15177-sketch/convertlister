/**
 * ==========================================================
 * WINNING TYPES
 * ==========================================================
 *
 * Enterprise Winning Detection
 * Canonical Domain Types
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningExplanation,
} from "./winning.explanation";

/* ==========================================================
 * SCORE
 * ==========================================================
 */

export type WinningScore = number;

export type WinningConfidence = number;

/* ==========================================================
 * LEVEL
 * ==========================================================
 */

export type WinningLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "WINNER";

/* ==========================================================
 * WINNING CANDIDATE
 * ==========================================================
 */

export interface WinningCandidate {

  readonly id: string;

  readonly product: NormalizedProduct;

  readonly score: WinningScore;

  readonly confidence: WinningConfidence;

  readonly level: WinningLevel;

  readonly passed: boolean;

  readonly reasons:
    readonly string[];

  readonly explanation:
    WinningExplanation;

  readonly createdAt: Date;

}

/* ==========================================================
 * SCORE BREAKDOWN
 * ==========================================================
 */

export interface WinningScoreBreakdown {

  readonly title: number;

  readonly description: number;

  readonly images: number;

  readonly price: number;

  readonly attributes: number;

  readonly keywords: number;

  readonly marketplace: number;

  readonly source: number;

}

/* ==========================================================
 * ENGINE RESULT
 * ==========================================================
 */

export interface WinningResult {

  readonly candidate:
    WinningCandidate;

  readonly durationMs:
    number;

}

/* ==========================================================
 * METRICS
 * ==========================================================
 */

export interface WinningStatistics {

  readonly processed: number;

  readonly winners: number;

  readonly rejected: number;

  readonly averageScore: number;

  readonly averageConfidence: number;

}
