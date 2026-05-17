import { calculateHealthScore } from './score'

export function evaluateProduct(p: {
  impressions: number
  clicks: number
  sales: number
  refund_rate: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
}) {
  const score = calculateHealthScore(p)

  let status: 'winner' | 'needs_optimization' | 'risk' | 'dead' =
    'active' as any

  let is_dead = false

  // ----------------------------
  // STATUS CLASSIFICATION
  // ----------------------------
  if (score >= 80) {
    status = 'winner'
  } else if (score >= 50) {
    status = 'needs_optimization'
  } else {
    status = 'risk'

    // ----------------------------
    // DEAD PRODUCT DETECTION
    // ----------------------------
    if (
      p.sales === 0 &&
      p.impressions > 50 &&
      p.clicks === 0
    ) {
      status = 'dead'
      is_dead = true
    }
  }

  return {
    health_score: score,
    status,
    is_dead,
    last_scored_at: new Date().toISOString(),
  }
}
