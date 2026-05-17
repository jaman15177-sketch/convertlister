export function penaltyScore(
  product: any
) {

  let penalty = 0

  if (product.rating < 4.0)
    penalty += 20

  if (product.reviews < 20)
    penalty += 15

  if (product.price > 100)
    penalty += 20

  return penalty
}
