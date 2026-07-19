/**
 * ==========================================================
 * WINNING ENGINE
 * ==========================================================
 *
 * Enterprise Winning Engine
 *
 * Responsibilities
 * - Winning subsystem entry point
 * - Orchestrate detector
 * - Ranking
 * - Metrics
 * - Snapshot
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningCandidate,
} from "./winning.types";

import {
  winningDetector,
} from "./winning.detector";

import {
  winningRanking,
  type RankedWinningCandidate,
} from "./winning.ranking";

import {
  winningMetrics,
  type WinningMetrics,
} from "./winning.metrics";

import {
  winningSnapshot,
  type WinningSnapshot,
} from "./winning.snapshot";

export class WinningEngine {

  execute(
    product: NormalizedProduct
  ): WinningCandidate {

    return winningDetector.detect(
      product
    );

  }

  executeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return winningDetector.detectMany(
      products
    );

  }

  executeWinners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return this.executeMany(
      products
    ).filter(
      candidate =>
        candidate.passed
    );

  }

  rank(
    candidates:
      readonly WinningCandidate[]
  ): readonly RankedWinningCandidate[] {

    return winningRanking.rank(
      candidates
    );

  }

  top(
    candidates:
      readonly WinningCandidate[],
    limit = 10
  ): readonly RankedWinningCandidate[] {

    return winningRanking.top(
      candidates,
      limit
    );

  }

  metrics(
    candidates:
      readonly WinningCandidate[]
  ): WinningMetrics {

    winningMetrics.start();

    return winningMetrics.finish(
      candidates
    );

  }

  snapshots(
    candidates:
      readonly WinningCandidate[]
  ): readonly WinningSnapshot[] {

    return winningSnapshot.createMany(
      candidates
    );

  }

}

export const winningEngine =
  new WinningEngine();
