export function scoreProduct(p: any) {

  let score = 0

  // ⭐ rating weight
  score += (p.rating || 0) * 10

  // 🔥 reviews signal
  score += Math.min((p.reviews_count || 0) / 100, 30)

  // 💰 price sweet spot (cheap = better)
  if (p.price < 50) score += 20
  if (p.price < 20) score += 10

  // 📈 trend boost
  if (p.trending) score += 25

  return Math.round(score)
}
export function calculateWinningScore(product: any) {
  return 100;
}
