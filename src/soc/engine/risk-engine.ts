export function calculateRisk(event: {
  ip: string;
  organizationId: string;
  path?: string;
}): number {
  let score = 10;

  // fake but realistic heuristics
  if (event.path?.includes("/admin")) score += 30;
  if (event.path?.includes("recharge")) score += 20;

  if (event.ip.startsWith("10.")) score -= 5;

  // tenant randomness simulation
  score += Math.floor(Math.random() * 20);

  return Math.min(100, Math.max(0, score));
}
