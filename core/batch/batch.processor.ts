import { calculateWinningScore }
from "../engine/scorer"

import { isWinningProduct }
from "../engine/winner.filter"

import { optimizeProduct }
from "../engine/optimizer"

import { calculateTrendScore }
from "../trends/trend.engine"

// =========================
// 🆕 DATABASE PIPELINE
// =========================
import { saveWinnerProduct }
from "../database/winner.repo"

export async function processBatch(
  products: any[]
) {

  const winners = []

  for (const product of products) {

    console.log(
      "⚙️ PROCESSING:",
      product.title
    )

    // =========================
    // AI SCORE
    // =========================
    const aiScore =
      calculateWinningScore(product)

    // =========================
    // TREND SCORE
    // =========================
    const trend =
      calculateTrendScore(product)

    const finalScore =
      Math.round(
        aiScore * 0.6 +
        trend.trend_score * 0.4
      )

    // =========================
    // FILTER
    // =========================
    if (!isWinningProduct(finalScore)) {

      console.log(
        "❌ REJECTED:",
        product.title
      )

      continue
    }

    // =========================
    // OPTIMIZE
    // =========================
    const optimized =
      optimizeProduct(product.title)

    const winnerProduct = {

      ...product,

      ai_score: aiScore,
      trend_score:
        trend.trend_score,
      final_score: finalScore,
      category: trend.category,
      optimized
    }

    console.log(
      "🏆 WINNER SAVED:",
      product.title
    )

    // =========================
    // 💾 SAVE TO DATABASE
    // =========================
    await saveWinnerProduct(
      winnerProduct
    )

    winners.push(winnerProduct)

    await new Promise(
      r => setTimeout(r, 500)
    )
  }

  return winners
}
