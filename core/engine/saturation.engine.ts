export function saturationEngine(product: any) {

  let score = 100

  const reviews =
    product.reviews || 0

  const rating =
    product.rating || 0

  const sellers =
    product.sellers || 1

  // 🔥 High saturation signals

  if (reviews > 1000)
    score -= 25

  if (reviews > 5000)
    score -= 50

  if (sellers > 20)
    score -= 20

  if (rating === 5 && reviews < 20)
    score -= 30 // fake saturation pattern

  // 🧠 ensure never negative
  return Math.max(0, score)
}
export function saturationScore(product: any): number {
  return 50;
}
