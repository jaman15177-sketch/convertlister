import { pushSOCEvent } from "@/soc/ws/soc-server";

export function emitSOC(result: any) {
  if (result.decision !== "ALLOW") {
    pushSOCEvent({
      type: "SECURITY_DECISION",
      userId: result.context.userId,
      organizationId: result.context.organizationId,
      decision: result.decision,
      riskScore: result.context.riskScore,
      reason: result.reason,
      timestamp: Date.now(),
    });
  }
}
