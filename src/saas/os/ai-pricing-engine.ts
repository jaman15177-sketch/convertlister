export function aiPricingEngine(input: {
  usage: number;
  revenue: number;
}) {
  const { usage, revenue } = input;

  let priceMultiplier = 1;

  // 🧠 AI logic (simple version)
  if (usage > 1000) priceMultiplier += 0.5;
  if (usage > 2000) priceMultiplier += 1;
  if (revenue > 100) priceMultiplier += 1;

  return {
    suggestedPlan:
      priceMultiplier > 2
        ? "enterprise"
        : priceMultiplier > 1.2
        ? "pro"
        : "free",

    priceMultiplier,
  };
}
