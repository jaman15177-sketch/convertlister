export function fakeReviewEngine(product: any) {

  let penalty = 0

  const ratio =
    product.reviews / (product.rating + 1)

  if (ratio > 2000)
    penalty += 30

  if (product.rating === 5 && product.reviews < 20)
    penalty += 40

  return penalty
}
