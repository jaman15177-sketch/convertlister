import { trendScore }
from "./trend.engine"

import { saturationScore }
from "./saturation.engine"

import { marginScore }
from "./margin.engine"

import { velocityScore }
from "./velocity.engine"

import { competitionScore }
from "./competition.engine"

import { trustScore }
from "./trust.engine"

import { penaltyScore }
from "./penalty.engine"

export function calculateScore(
  product: any
) {

  const trend =
    trendScore(product)

  const saturation =
    saturationScore(product)

  const margin =
    marginScore(product)

  const velocity =
    velocityScore(product)

  const competition =
    competitionScore(product)

  const trust =
    trustScore(product)

  const penalty =
    penaltyScore(product)

  const weighted =

    trend * 0.25 +

    margin * 0.15 +

    velocity * 0.20 +

    trust * 0.20 +

    competition * 0.10 +

    saturation * 0.10

  const finalScore =
    weighted - penalty

  return Math.max(
    0,
    Math.min(
      Math.round(finalScore),
      100
    )
  )
}
