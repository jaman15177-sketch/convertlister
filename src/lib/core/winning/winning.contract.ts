/**
 * ==========================================================
 * WINNING CONTRACT
 * ==========================================================
 *
 * Enterprise Winning Contracts
 *
 * Responsibilities
 * - Public subsystem contracts
 * - Engine boundary
 * - Service boundary
 * - Repository boundary
 *
 * Rules
 * - Interface only
 * - No implementation
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningCandidate,
} from "./winning.types";

import type {
  WinningStatistics,
} from "./winning.statistics";

/* ==========================================================
 * ENGINE CONTRACT
 * ==========================================================
 */

export interface WinningEngineContract {

  execute(
    product: NormalizedProduct
  ): WinningCandidate;

  executeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[];

  executeWinners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[];

}

/* ==========================================================
 * SERVICE CONTRACT
 * ==========================================================
 */

export interface WinningServiceContract {

  analyze(
    product: NormalizedProduct
  ): WinningCandidate;

  analyzeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[];

  winners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[];

}

/* ==========================================================
 * VALIDATOR CONTRACT
 * ==========================================================
 */

export interface WinningValidatorContract {

  validate(
    candidate: WinningCandidate
  ): void;

}

/* ==========================================================
 * REPOSITORY CONTRACT
 * ==========================================================
 */

export interface WinningRepositoryContract {

  save(
    candidate: WinningCandidate
  ): Promise<void>;

  saveMany(
    candidates:
      readonly WinningCandidate[]
  ): Promise<void>;

  findById(
    id: string
  ): Promise<
    WinningCandidate | null
  >;

  findAll(): Promise<
    readonly WinningCandidate[]
  >;

  delete(
    id: string
  ): Promise<void>;

}

/* ==========================================================
 * METRICS CONTRACT
 * ==========================================================
 */

export interface WinningMetricsContract {

  getStatistics():
    WinningStatistics;

}
