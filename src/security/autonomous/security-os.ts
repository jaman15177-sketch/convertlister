import { evaluateRiskAction } from "./policy-engine";
import { pushSOCEvent } from "@/soc/ws/soc-server";

export async function autonomousSecurityOS(input: {
  organizationId: string;
  userId: string;
  sessionId: string;
  riskScore: number;
  ip: string;
}) {
  const action = evaluateRiskAction(input.riskScore);

  // 🔥 SOC EVENT STREAM
  pushSOCEvent({
    type: "AUTONOMOUS_DECISION",
    organizationId: input.organizationId,
    userId: input.userId,
    sessionId: input.sessionId,
    riskScore: input.riskScore,
    action,
    ip: input.ip,
    timestamp: Date.now(),
  });

  return action;
}
