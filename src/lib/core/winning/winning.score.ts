/**
 * ==========================================================
 * WINNING SCORE
 * ==========================================================
 *
 * Enterprise Winning Score Engine
 *
 * Responsibilities
 * - Execute rule library
 * - Aggregate score
 * - Calculate confidence
 * - Generate explanation
 * - Return immutable result
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningExplanation,
} from "./winning.explanation";

import {
  WinningRules,
} from "./winning.rules";

import {
  WinningConfidenceEngine,
} from "./winning.confidence";

import {
  WinningExplanationEngine,
} from "./winning.explanation";

import {
  DEFAULT_WINNING_THRESHOLD,
} from "./winning.constants";

/* ==========================================================
 * SCORE RESULT
 * ==========================================================
 */

export interface WinningScoreResult {

  readonly score: number;

  readonly confidence: number;

  readonly passed: boolean;

  readonly reasons:
    readonly string[];

  readonly explanation:
    WinningExplanation;

}

/* ==========================================================
 * SCORE ENGINE
 * ==========================================================
 */

export class WinningScoreEngine {

  private constructor() {}

  static calculate(
    product: NormalizedProduct
  ): WinningScoreResult {

    const results =
      WinningRules.evaluate(
        product
      );

    let score = 0;

    const reasons: string[] = [];

    for (
      const result of results
    ) {

      if (
        result.passed
      ) {

        score +=
          result.weight;

        reasons.push(
          result.name
        );

      }

    }

    score =
      Math.max(
        0,
        Math.min(
          100,
          score
        )
      );

    const confidence =
      WinningConfidenceEngine
        .calculate(
          score
        );

    const explanation =
      WinningExplanationEngine
        .generate(
          reasons
        );

    return {

      score,

      confidence:
        confidence.confidence,

      passed:
        score >=
        DEFAULT_WINNING_THRESHOLD,

      reasons,

      explanation,

    };

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningScore =
  WinningScoreEngine;
