import type { SecurityContext, SecurityResult } from "./security-kernel";
export function decideSecurity(
  ctx: SecurityContext
): SecurityResult {
  if (ctx.riskScore > 90) {
    return {
      decision: "BLOCK",
      reason: "Extreme risk detected",
      context: ctx,
    };
  }

  if (ctx.riskScore > 70) {
    return {
      decision: "CHALLENGE",
      reason: "High risk behavior",
      context: ctx,
    };
  }

  if (ctx.riskScore > 50) {
    return {
      decision: "RATE_LIMIT",
      reason: "Medium risk",
      context: ctx,
    };
  }

  return {
    decision: "ALLOW",
    reason: "Normal behavior",
    context: ctx,
  };
}
