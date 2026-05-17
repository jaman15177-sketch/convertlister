export function calculateSaturation(
  reviews: number
): number {

  // LOWER COMPETITION = HIGH SCORE
  if (reviews > 10000) return 20
  if (reviews > 5000) return 40
  if (reviews > 2000) return 65
  if (reviews > 500) return 85

  return 100
}
