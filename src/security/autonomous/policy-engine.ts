export type RiskAction =
  | "ALLOW"
  | "CHALLENGE"
  | "BLOCK"
  | "REVOKE_SESSION";

export function evaluateRiskAction(
  riskScore: number
): RiskAction {
  if (riskScore >= 90) return "REVOKE_SESSION";
  if (riskScore >= 80) return "BLOCK";
  if (riskScore >= 60) return "CHALLENGE";
  return "ALLOW";
}
