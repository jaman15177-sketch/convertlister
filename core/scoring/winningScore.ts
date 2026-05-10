import { Product } from "../product.model";

export function calculateWinningScore(product: Product): number {
  const demand = Math.min(100, (product.sales ?? 0) / 10);

  const competition = Math.min(100, (product.sellers ?? 0) / 5);

  const competitionAdjusted = 100 - competition;

  const cost = product.cost ?? product.price * 0.6;

  const margin = ((product.price - cost) / product.price) * 100;

  const viral = Math.min(
    100,
    ((product.likes ?? 0) * 0.5 +
      (product.shares ?? 0) * 3 +
      (product.comments ?? 0) * 2) /
      10
  );

  const score =
    demand * 0.35 +
    competitionAdjusted * 0.25 +
    margin * 0.2 +
    viral * 0.2;

  return Math.round(score);
}

export function shouldImport(score: number) {
  if (score >= 75) return "auto-import";

  if (score >= 50) return "review";

  return "reject";
}

