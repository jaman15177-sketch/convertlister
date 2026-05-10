type Product = {
  title: string;
  price: number;
  cost?: number;
  sales?: number;
  sellers?: number;
  trendCurrent?: number;
  trendPast?: number;
  likes?: number;
  shares?: number;
  comments?: number;
};

export function autoImportEngine(products: Product[]) {
  const scored = products.map((p) => {
    const demand = Math.min(100, (p.sales ?? 0) / 10);
    const competition = Math.min(100, (p.sellers ?? 0) / 5);
    const competitionAdjusted = 100 - competition;

    const cost = p.cost ?? p.price * 0.6;
    const margin = ((p.price - cost) / p.price) * 100;

    const viral = Math.min(
      100,
      ((p.likes ?? 0) * 0.5 +
        (p.shares ?? 0) * 3 +
        (p.comments ?? 0) * 2) /
        10
    );

    const score =
      demand * 0.35 +
      competitionAdjusted * 0.25 +
      margin * 0.2 +
      viral * 0.2;

    let decision: "auto-import" | "review" | "reject";

    if (score >= 75) decision = "auto-import";
    else if (score >= 50) decision = "review";
    else decision = "reject";

    return {
      ...p,
      score: Math.round(score),
      decision,
      isWinning: decision === "auto-import",
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
