import { pushSOCEvent } from "@/soc/ws/soc-server";
import { getRedis } from "@/lib/redis";

/**
 * 🧠 Threat context coming from V6 ML engine
 */
export type ThreatEvent = {
  userId: string;
  organizationId: string;
  ip: string;
  riskScore: number;
  anomalyScore?: number;
  prediction: "SAFE" | "SUSPICIOUS" | "ATTACK";
};

/**
 * ======================================================
 * 1. LLM-STYLE SECURITY REASONING ENGINE (SIMULATED)
 * ======================================================
 */
function reasonThreat(event: ThreatEvent): string[] {
  const actions: string[] = [];

  if (event.riskScore > 85) {
    actions.push("BLOCK_IP");
    actions.push("REVOKE_SESSION");
  }

  if (event.prediction === "ATTACK") {
    actions.push("ENABLE_HARD_CHALLENGE");
    actions.push("INCREASE_RATE_LIMIT");
  }

  if (event.anomalyScore && event.anomalyScore > 70) {
    actions.push("STEP_UP_AUTH");
  }

  return actions;
}

/**
 * ======================================================
 * 2. AUTO FIREWALL RULE GENERATOR
 * ======================================================
 */
async function generateFirewallRule(
  event: ThreatEvent,
  actions: string[]
) {
  const rule = {
    id: `fw_${Date.now()}`,
    organizationId: event.organizationId,
    ip: event.ip,
    actions,
    createdAt: Date.now(),
  };

  const redis = getRedis();

  if (redis) {
    await redis.setex(
      `firewall:${event.ip}`,
      3600,
      JSON.stringify(rule)
    );
  }

  return rule;
}

/**
 * ======================================================
 * 3. ATTACK SIMULATION ENGINE
 * ======================================================
 */
function simulateAttackProbability(
  event: ThreatEvent
): number {
  let score = event.riskScore;

  if (event.prediction === "ATTACK") score += 20;

  if (event.anomalyScore) {
    score += event.anomalyScore * 0.2;
  }

  return Math.min(100, score);
}

/**
 * ======================================================
 * 4. SELF HEALING ENGINE
 * ======================================================
 */
async function selfHeal(rule: any) {
  const redis = getRedis();

  if (!redis) return;

  if (rule.actions.includes("BLOCK_IP")) {
    await redis.setex(
      `blocked:${rule.ip}`,
      3600,
      "true"
    );
  }

  if (rule.actions.includes("REVOKE_SESSION")) {
    await redis.setex(
      `revoked:${rule.ip}`,
      3600,
      "true"
    );
  }
}

/**
 * ======================================================
 * 5. CONTINUOUS LEARNING LOOP
 * ======================================================
 */
async function learningLoop(
  event: ThreatEvent
) {
  const redis = getRedis();

  if (!redis) return;

  await redis.lpush(
    "security:events",
    JSON.stringify(event)
  );
}

/**
 * ======================================================
 * 6. AUTONOMOUS SECURITY OS (MAIN BRAIN)
 * ======================================================
 */
export async function autonomousSecurityOS(
  event: ThreatEvent
) {
  const actions = reasonThreat(event);

  const attackScore =
    simulateAttackProbability(event);

  const rule =
    await generateFirewallRule(
      event,
      actions
    );

  await selfHeal(rule);

  await learningLoop(event);

  pushSOCEvent({
    type: "AUTONOMOUS_SECURITY_ACTION",
    userId: event.userId,
    organizationId: event.organizationId,
    riskScore: event.riskScore,
    prediction: event.prediction,
    attackScore,
    actions,
    timestamp: Date.now(),
  });

  return {
    decision:
      attackScore > 80
        ? "REVOKE_SESSION"
        : attackScore > 60
        ? "CHALLENGE_USER"
        : "ALLOW",
    rule,
    attackScore,
  };
}
