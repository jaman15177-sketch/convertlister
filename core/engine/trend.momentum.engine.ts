export function trendMomentum(product: any) {

  let score = 0

  const reviews = product.reviews

  if (reviews > 50) score += 10
  if (reviews > 200) score += 20
  if (reviews > 1000) score += 30
  if (reviews > 5000) score -= 20 // saturation pressure

  return score
}
