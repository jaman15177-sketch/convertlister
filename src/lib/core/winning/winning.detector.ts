/**
 * ==========================================================
 * WINNING DETECTOR
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningCandidate,
  WinningLevel,
} from "./winning.types";

import {
  WinningMapper,
} from "./winning.mapper";

import {
  winningValidator,
} from "./winning.validator";

import {
  WinningScoreEngine,
} from "./winning.score";

export class WinningDetector {

  detect(
    product: NormalizedProduct
  ): WinningCandidate {

    const candidate =
      WinningMapper.toCandidate(
        product
      );

    winningValidator.validate(
      candidate
    );

    const result =
      WinningScoreEngine.calculate(
        product
      );

    const level:
      WinningLevel =
      result.score >= 90
        ? "WINNER"
        : result.score >= 70
          ? "HIGH"
          : result.score >= 40
            ? "MEDIUM"
            : "LOW";

    return {

      ...candidate,

      score:
        result.score,

      confidence:
        result.confidence,

      level,

      passed:
        result.passed,

      reasons:
        [...result.reasons],

      explanation:
        result.explanation,

    };

  }

  detectMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return products.map(
      product =>
        this.detect(
          product
        )
    );

  }

}

export const winningDetector =
  new WinningDetector();
