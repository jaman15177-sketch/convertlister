/**
 * ==========================================================
 * WINNING SCORE
 * ==========================================================
 *
 * Enterprise Winning Score Engine
 *
 * Responsibilities
 * - Execute winning rules
 * - Aggregate score
 * - Normalize score
 * - Decide winner
 * - Return immutable result
 *
 * Rules
 * - No ranking
 * - No metrics
 * - No repository
 * - No persistence
 * - No AI
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import {
  winningRules,
} from "./winning.rules";

/* ==========================================================
 * RESULT
 * ==========================================================
 */

export interface WinningScoreResult {

  readonly score: number;

  readonly winner: boolean;

  readonly reasons:
    readonly string[];

}

/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class WinningScoreEngine {

  private constructor() {}

  static calculate(
    product: NormalizedProduct
  ): WinningScoreResult {

    let score = 0;

    const reasons:
      string[] = [];

    for (
      const rule
      of winningRules
    ) {

      if (
        !rule.enabled
      ) {

        continue;

      }

      const result =
        rule.evaluate(
          product
        );

      score +=
        result.score;

      if (
        result.passed
      ) {

        reasons.push(
          result.reason
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

    return {

      score,

      winner:
        score >= 80,

      reasons,

    };

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningScore =
  WinningScoreEngine;
