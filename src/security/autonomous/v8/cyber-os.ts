import { pushSOCEvent } from "@/soc/ws/soc-server";
import { getRedis } from "@/lib/redis";

/**
 * ======================================================
 * TYPES
 * ======================================================
 */
export type ThreatContext = {
  userId: string;
  organizationId: string;
  ip: string;
  riskScore: number;
  anomalyScore?: number;
  prediction: "SAFE" | "SUSPICIOUS" | "ATTACK";
};

/**
 * ======================================================
 * 1. LLM REASONING ENGINE (SIMULATED)
 * ======================================================
 */
async function llmReason(event: ThreatContext) {
  const decision = {
    threatLevel:
      event.riskScore > 85
        ? "CRITICAL"
        : event.riskScore > 60
        ? "HIGH"
        : "LOW",

    actions: [] as string[],
  };

  if (decision.threatLevel === "CRITICAL") {
    decision.actions.push("REVOKE_SESSION");
    decision.actions.push("BLOCK_IP");
    decision.actions.push("ESCALATE_SOC");
  }

  if (event.prediction === "ATTACK") {
    decision.actions.push("ENABLE_HARD_CHALLENGE");
  }

  return decision;
}

/**
 * ======================================================
 * 2. ZERO TRUST POLICY COMPILER
 * ======================================================
 */
function compilePolicy(
  event: ThreatContext,
  actions: string[]
) {
  return {
    id: `policy_${Date.now()}`,
    organizationId: event.organizationId,
    rules: actions.map((a) => ({
      action: a,
      condition: event.ip,
    })),
    createdAt: Date.now(),
  };
}

/**
 * ======================================================
 * 3. PENETRATION SIMULATION ENGINE
 * ======================================================
 */
function simulatePenTest(
  event: ThreatContext
) {
  let score = event.riskScore;

  if (event.anomalyScore) {
    score += event.anomalyScore * 0.3;
  }

  if (event.prediction === "ATTACK") {
    score += 25;
  }

  return Math.min(100, score);
}

/**
 * ======================================================
 * 4. SELF-EVOLVING FIREWALL ENGINE
 * ======================================================
 */
async function evolveFirewall(policy: any) {
  const redis = getRedis();

  if (!redis) return;

  for (const rule of policy.rules) {
    await redis.setex(
      `fw:${policy.organizationId}:${rule.condition}`,
      3600,
      rule.action
    );
  }
}

/**
 * ======================================================
 * 5. SOC ANALYST
 * ======================================================
 */
async function socAnalyst(
  event: ThreatContext,
  decision: any,
  penScore: number
) {
  const redis = getRedis();

  let finalAction = "ALLOW";

  if (
    decision.threatLevel === "CRITICAL" ||
    penScore > 80
  ) {
    finalAction = "IMMEDIATE_REVOKE";
  } else if (penScore > 60) {
    finalAction = "CHALLENGE_USER";
  }

  pushSOCEvent({
    type: "AI_SOC_ANALYSIS",
    userId: event.userId,
    organizationId: event.organizationId,
    ip: event.ip,
    riskScore: event.riskScore,
    finalAction,
    timestamp: Date.now(),
  });

  return finalAction;
}

/**
 * ======================================================
 * 6. MAIN AUTONOMOUS CYBER OS
 * ======================================================
 */
export async function autonomousCyberOS(
  event: ThreatContext
) {
  const decision = await llmReason(event);

  const penScore =
    simulatePenTest(event);

  const policy = compilePolicy(
    event,
    decision.actions
  );

  await evolveFirewall(policy);

  const finalAction = await socAnalyst(
    event,
    decision,
    penScore
  );

  return {
    organizationId: event.organizationId,
    userId: event.userId,
    riskScore: event.riskScore,
    penTestScore: penScore,
    decision,
    finalAction,
  };
}
