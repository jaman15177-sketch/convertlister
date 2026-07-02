/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Score Engine
 * ============================================================
 *
 * Shared scoring engine for every validator.
 *
 * Validators
 * ------------------------------------------------------------
 * • Title
 * • Description
 * • Price
 * • Image
 * • Category
 * • Brand
 * • Variant
 * • SEO
 * • Duplicate
 * • Marketplace
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Build Safe
 * ✓ Zero Duplicate Logic
 * ✓ Immutable
 * ✓ Enterprise Ready
 * ✓ AI Friendly
 * ============================================================
 */

import {
  MAX_HEALTH_SCORE,
  MIN_HEALTH_SCORE,
} from "../health.constants";

/**
 * ============================================================
 * SCORE ENGINE
 * ============================================================
 */
export class ScoreEngine {

  /**
   * Maximum possible score.
   */
  public readonly maxScore: number;

  /**
   * Minimum possible score.
   */
  public readonly minScore: number;

  constructor(
    maxScore: number = MAX_HEALTH_SCORE,
    minScore: number = MIN_HEALTH_SCORE
  ) {
    this.maxScore = maxScore;
    this.minScore = minScore;
  }
  /**
   * ============================================================
   * CLAMP SCORE
   * ------------------------------------------------------------
   * Keeps score inside the configured range.
   * ============================================================
   */
  public clampScore(score: number): number {
    if (!Number.isFinite(score)) {
      return this.minScore;
    }

    if (score > this.maxScore) {
      return this.maxScore;
    }

    if (score < this.minScore) {
      return this.minScore;
    }

    return score;
  }

  /**
   * ============================================================
   * NORMALIZE SCORE
   * ------------------------------------------------------------
   * Rounds score and guarantees valid output.
   * ============================================================
   */
  public normalize(score: number): number {
    const normalized = Math.round(score);

    return this.clampScore(normalized);
  }  /**
   * ============================================================
   * DEDUCT SCORE
   * ------------------------------------------------------------
   * Applies a penalty and returns a normalized score.
   *
   * This method is immutable:
   * the original score is never modified.
   * ============================================================
   */
  public deduct(
    currentScore: number,
    penalty: number
  ): number {
    if (!Number.isFinite(currentScore)) {
      currentScore = this.maxScore;
    }

    if (!Number.isFinite(penalty) || penalty <= 0) {
      return this.normalize(currentScore);
    }

    return this.normalize(currentScore - penalty);
  }

  /**
   * ============================================================
   * APPLY BONUS
   * ------------------------------------------------------------
   * Applies a positive bonus and returns
   * a normalized score.
   *
   * Immutable implementation.
   * ============================================================
   */
  public bonus(
    currentScore: number,
    bonus: number
  ): number {
    if (!Number.isFinite(currentScore)) {
      currentScore = this.minScore;
    }

    if (!Number.isFinite(bonus) || bonus <= 0) {
      return this.normalize(currentScore);
    }

    return this.normalize(currentScore + bonus);
  }  /**
   * ============================================================
   * APPLY WEIGHT
   * ------------------------------------------------------------
   * Converts a raw score into a weighted contribution.
   *
   * Example
   * ------------------------------------------------------------
   * Raw Score : 80
   * Weight    : 20
   *
   * Result
   * ------------------------------------------------------------
   * 16
   *
   * Formula
   * ------------------------------------------------------------
   * weighted = score × (weight / 100)
   * ============================================================
   */
  public applyWeight(
    score: number,
    weight: number
  ): number {
    const normalizedScore = this.normalize(score);

    if (!Number.isFinite(weight)) {
      return 0;
    }

    if (weight <= 0) {
      return 0;
    }

    if (weight > 100) {
      weight = 100;
    }

    const weightedScore =
      normalizedScore * (weight / 100);

    return Number(weightedScore.toFixed(2));
  }

  /**
   * ============================================================
   * APPLY MULTIPLE WEIGHTS
   * ------------------------------------------------------------
   * Calculates weighted contributions for multiple scores.
   *
   * Useful for overall catalog health calculation.
   * ============================================================
   */
  public applyWeights(
    values: ReadonlyArray<{
      score: number;
      weight: number;
    }>
  ): number {
    let total = 0;

    for (const value of values) {
      total += this.applyWeight(
        value.score,
        value.weight
      );
    }

    return Number(total.toFixed(2));
  }  /**
   * ============================================================
   * MERGE PENALTIES
   * ------------------------------------------------------------
   * Combines multiple penalty values into one safe value.
   *
   * Rules
   * ------------------------------------------------------------
   * • Ignore invalid numbers
   * • Ignore negative penalties
   * • Prevent overflow
   * • Deterministic output
   * ============================================================
   */
  public mergePenalty(
    penalties: ReadonlyArray<number>
  ): number {
    let total = 0;

    for (const penalty of penalties) {
      if (!Number.isFinite(penalty)) {
        continue;
      }

      if (penalty <= 0) {
        continue;
      }

      total += penalty;
    }

    return Number(total.toFixed(2));
  }

  /**
   * ============================================================
   * MERGE BONUSES
   * ------------------------------------------------------------
   * Combines multiple bonus values.
   *
   * Rules
   * ------------------------------------------------------------
   * • Ignore invalid numbers
   * • Ignore negative bonuses
   * • Stable deterministic output
   * ============================================================
   */
  public mergeBonus(
    bonuses: ReadonlyArray<number>
  ): number {
    let total = 0;

    for (const bonus of bonuses) {
      if (!Number.isFinite(bonus)) {
        continue;
      }

      if (bonus <= 0) {
        continue;
      }

      total += bonus;
    }

    return Number(total.toFixed(2));
  }  /**
   * ============================================================
   * FINAL SCORE INPUT
   * ============================================================
   */
  public calculateFinalScore(params: {
    baseScore: number;

    penalties?: ReadonlyArray<number>;

    bonuses?: ReadonlyArray<number>;
  }): number {
    const {
      baseScore,
      penalties = [],
      bonuses = [],
    } = params;

    // Normalize starting score
    let score = this.normalize(baseScore);

    // Merge penalties
    const totalPenalty = this.mergePenalty(penalties);

    // Merge bonuses
    const totalBonus = this.mergeBonus(bonuses);

    // Apply penalty
    score = this.deduct(score, totalPenalty);

    // Apply bonus
    score = this.bonus(score, totalBonus);

    // Final normalization
    return this.normalize(score);
  }
}
