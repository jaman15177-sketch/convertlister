/**
 * ==========================================================
 * WINNING CONFIG
 * ==========================================================
 *
 * Enterprise Winning Detection Configuration
 *
 * Responsibilities
 * - Engine configuration
 * - Threshold configuration
 * - Weight configuration
 * - Runtime defaults
 *
 * Rules
 * - Configuration only
 * - No business logic
 * - No scoring logic
 * ==========================================================
 */

import {
  WINNING_LOW_THRESHOLD,
  WINNING_MEDIUM_THRESHOLD,
  WINNING_HIGH_THRESHOLD,
  WINNING_WINNER_THRESHOLD,
  DEFAULT_BATCH_SIZE,
  DEFAULT_MINIMUM_SCORE,
  DEFAULT_PRICE_WEIGHT,
  DEFAULT_TITLE_WEIGHT,
  DEFAULT_DESCRIPTION_WEIGHT,
  DEFAULT_IMAGE_WEIGHT,
  DEFAULT_ATTRIBUTE_WEIGHT,
  DEFAULT_KEYWORD_WEIGHT,
  DEFAULT_MARKETPLACE_WEIGHT,
  DEFAULT_SOURCE_WEIGHT,
  DEFAULT_VARIANT_WEIGHT,
} from "./winning.constants";

/* ==========================================================
 * SCORE WEIGHTS
 * ==========================================================
 */

export interface WinningWeights {

  readonly price: number;

  readonly title: number;

  readonly description: number;

  readonly images: number;

  readonly attributes: number;

  readonly keywords: number;

  readonly marketplace: number;

  readonly source: number;

  readonly variants: number;

}

/* ==========================================================
 * ENGINE CONFIG
 * ==========================================================
 */

export interface WinningConfig {

  readonly minimumScore: number;

  readonly batchSize: number;

  readonly thresholds: {

    readonly low: number;

    readonly medium: number;

    readonly high: number;

    readonly winner: number;

  };

  readonly weights: WinningWeights;

}

/* ==========================================================
 * DEFAULT CONFIG
 * ==========================================================
 */

export const DEFAULT_WINNING_CONFIG: WinningConfig = {

  minimumScore: DEFAULT_MINIMUM_SCORE,

  batchSize: DEFAULT_BATCH_SIZE,

  thresholds: {

    low: WINNING_LOW_THRESHOLD,

    medium: WINNING_MEDIUM_THRESHOLD,

    high: WINNING_HIGH_THRESHOLD,

    winner: WINNING_WINNER_THRESHOLD,

  },

  weights: {

    price: DEFAULT_PRICE_WEIGHT,

    title: DEFAULT_TITLE_WEIGHT,

    description: DEFAULT_DESCRIPTION_WEIGHT,

    images: DEFAULT_IMAGE_WEIGHT,

    attributes: DEFAULT_ATTRIBUTE_WEIGHT,

    keywords: DEFAULT_KEYWORD_WEIGHT,

    marketplace: DEFAULT_MARKETPLACE_WEIGHT,

    source: DEFAULT_SOURCE_WEIGHT,

    variants: DEFAULT_VARIANT_WEIGHT,

  },

};
