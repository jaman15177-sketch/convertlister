export function marginScore(product: any) {

  let score = 0

  if (product.price >= 20)
    score += 30

  if (product.price <= 60)
    score += 30

  return score
}
