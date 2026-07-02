import { buildIdentityV3 } from "@/security/iam/v3/core";
import { calculateRiskV2 } from "@/soc/engine/risk-engine-v2";
import type { RiskResult } from "@/soc/engine/risk-engine-v2";import { trackUsage } from "@/billing/engine/billing-core";
import { pushSOCEvent } from "@/soc/ws/soc-server";
import { autonomousSecurityOS } from "@/security/autonomous/security-os";

export type SecureContext = {
  identity: any;
  risk: RiskResult;
};

export async function withSecurity(
  req: any
): Promise<SecureContext> {
  // IAM
  const identity = await buildIdentityV3(req);

  // Risk Engine
  const risk = calculateRiskV2({
    ip: req.socket?.remoteAddress || "unknown",
    organizationId: identity.organizationId,
    path: req.url,
    userId: identity.userId,
    role: identity.role,
    sessionId: identity.sessionId,
  });

  // Billing
  await trackUsage(identity.userId, "api_call", 1);

  // High Risk Flow
  if (risk.score > 80) {
    const action = await autonomousSecurityOS({
      organizationId: identity.organizationId,
      userId: identity.userId,
      sessionId: identity.sessionId,
      riskScore: risk.score,
      ip: identity.device?.ip,
    });

    pushSOCEvent({
      type: "HIGH_RISK_REQUEST",
      organizationId: identity.organizationId,
      userId: identity.userId,
      risk: risk.score,
      level: risk.level,
      reasons: risk.reasons,
      action,
      timestamp: Date.now(),
    });
  }

  return {
    identity,
    risk,
  };
}
