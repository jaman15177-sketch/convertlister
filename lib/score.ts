// lib/score.ts

export function calculateHealthScore(p: {
  impressions: number
  clicks: number
  sales: number
  refund_rate: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
}) {
  let score = 0

  // -----------------------
  // 1. CTR SCORE (0–25)
  // -----------------------
  const ctr =
    p.impressions > 0 ? p.clicks / p.impressions : 0

  if (ctr >= 0.05) score += 25
  else if (ctr >= 0.03) score += 18
  else if (ctr >= 0.01) score += 10
  else score += 3

  // -----------------------
  // 2. SALES SCORE (0–40)
  // -----------------------
  if (p.sales >= 10) score += 40
  else if (p.sales >= 5) score += 25
  else if (p.sales >= 1) score += 10
  else score += 0

  // -----------------------
  // 3. REFUND SCORE (0–20)
  // -----------------------
  if (p.refund_rate <= 2) score += 20
  else if (p.refund_rate <= 5) score += 12
  else if (p.refund_rate <= 10) score += 5
  else score += 0

  // -----------------------
  // 4. STOCK SCORE (0–15)
  // -----------------------
  if (p.stock_status === 'in_stock') score += 15
  else if (p.stock_status === 'low_stock') score += 8
  else score += 0

  // Final cap
  return Math.min(100, score)
}
