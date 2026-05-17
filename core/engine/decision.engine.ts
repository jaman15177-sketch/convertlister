import { nicheScore } from "./niche.engine"
import { trendMomentum } from "./trend.momentum.engine"
import { saturationEngine } from "./saturation.engine"
import { blacklistEngine } from "./blacklist.engine"
import { fakeReviewEngine } from "./fake-review.engine"
import { historicalEngine } from "./historical.engine"

export function decideWinner(product: any) {

  // 🧠 SIGNAL LAYERS
  const niche = nicheScore(product)
  const trend = trendMomentum(product)
  const saturation = saturationEngine(product)
  const history = historicalEngine(product)

  // ⚠️ PENALTY LAYERS
  const blacklistPenalty = blacklistEngine(product)
  const fakePenalty = fakeReviewEngine(product)

  // 🚀 FINAL SCORE BUILD
  const rawScore =
    niche +
    trend +
    saturation +
    history

  const penalty =
    blacklistPenalty +
    fakePenalty

  const finalScore =
    rawScore - penalty

  // 🧠 NORMALIZATION
  const score = Math.max(
    0,
    Math.min(100, Math.round(finalScore))
  )

  // 🚀 DECISION LOGIC
  const isWinner = score >= 75

  return {

    product,

    score,

    winner: isWinner,

    greenTick: isWinner,

    status: isWinner
      ? "winner"
      : "rejected"
  }
}
