import { calculateScore }
from "./scoring.engine"

import { WINNER_THRESHOLD }
from "./thresholds"

export async function detectWinner(
  product: any
) {

  const score =
    calculateScore(product)

  console.log("🏆 SCORE:", score)

  console.log(
    "🎯 THRESHOLD:",
    WINNER_THRESHOLD
  )

  const isWinner =
    Number(score) >=
    Number(WINNER_THRESHOLD)

  console.log(
    "🟢 WINNER:",
    isWinner
  )

  return {

    ...product,

    score,

    winner: isWinner,

    greenTick: isWinner,

    status:
      isWinner
      ? "winner"
      : "rejected"
  }
}
