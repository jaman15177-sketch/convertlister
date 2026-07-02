export function forecastRevenue(input: {
  users: number;
  avgRevenue: number;
}) {
  const { users, avgRevenue } = input;

  const growthFactor = users * 0.12;

  const forecast =
    users * avgRevenue * (1 + growthFactor);

  return {
    forecast,
    confidence: "AI_ESTIMATED",
  };
}
