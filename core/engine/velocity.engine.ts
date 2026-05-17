export function velocityScore(product: any) {

  let score = 0

  const reviews = product.reviews || 0

  if (reviews > 100)
    score += 20

  if (reviews > 500)
    score += 30

  if (reviews > 1000)
    score += 40

  return score
}
