export function trendScore(product: any) {

  let score = 0

  if (product.reviews > 500)
    score += 25

  if (product.rating >= 4.5)
    score += 25

  if (product.price >= 15)
    score += 10

  return score
}
