import { calculateVelocity }
from "./velocity.engine"

import { calculateSaturation }
from "./saturation.engine"

export interface TrendInput {
  title: string
  price: number
  rating: number
  reviews_count: number
}

export interface TrendResult {
  trend_score: number
  velocity_score: number
  saturation_score: number
  is_trending: boolean
  category: "HOT" | "NORMAL" | "FAILED"
}

// ==========================
// MAIN TREND ENGINE
// ==========================
export function calculateTrendScore(
  product: TrendInput
): TrendResult {

  const reviews =
    product.reviews_count

  // =========================
  // VELOCITY (growth signal)
  // =========================
  const velocity =
    calculateVelocity(reviews)

  // =========================
  // SATURATION (competition)
  // =========================
  const saturation =
    calculateSaturation(reviews)

  // =========================
  // FINAL TREND SCORE
  // =========================
  const trend_score =
    Math.round(
      velocity * 0.65 +
      saturation * 0.35
    )

  // =========================
  // CLASSIFICATION
  // =========================
  let category: any = "FAILED"

  if (trend_score >= 80)
    category = "HOT"

  else if (trend_score >= 60)
    category = "NORMAL"

  else
    category = "FAILED"

  return {

    trend_score,
    velocity_score: velocity,
    saturation_score: saturation,

    is_trending:
      trend_score >= 70,

    category
  }
}
