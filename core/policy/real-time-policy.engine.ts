type Action =
  | "read"
  | "write"
  | "delete"
  | "execute";

type Resource =
  | "projects"
  | "creatives"
  | "analytics"
  | "workspaces";

type Decision =
  | "ALLOW"
  | "DENY"
  | "LIMIT"
  | "REQUIRE_APPROVAL";

type PolicyEvent = {

  userId: string;

  orgId: string;

  resource: Resource;

  action: Action;

  resourceId?: string;

  context?: {

    ip?: string;

    device?: string;

    location?: string;

    time?: string;

    riskScore?: number;

    usageCount?: number;
  };
};

type PolicyRule = {

  id: string;

  resource: Resource;

  action: Action;

  priority: number;

  conditions: {

    maxUsagePerHour?: number;

    maxRiskScore?: number;

    allowedRoles?: string[];

    timeWindow?: {

      start: number;

      end: number;
    };

    geoBlock?: string[];
  };

  effect: Decision;
};

// -----------------------------------------------------
// IN-MEMORY POLICY CACHE (REAL-TIME FAST LAYER)
// -----------------------------------------------------

const policyCache = new Map<string, PolicyRule[]>();

// -----------------------------------------------------
// RUNTIME CONTEXT EVALUATION
// -----------------------------------------------------

function evaluateRule(
  rule: PolicyRule,
  event: PolicyEvent
): Decision | null {

  const ctx = event.context;

  // Risk check
  if (
    rule.conditions.maxRiskScore &&
    (ctx?.riskScore || 0) > rule.conditions.maxRiskScore
  ) {
    return "DENY";
  }

  // Usage limit check
  if (
    rule.conditions.maxUsagePerHour &&
    (ctx?.usageCount || 0) >
      rule.conditions.maxUsagePerHour
  ) {
    return "LIMIT";
  }

  // Geo block
  if (
    rule.conditions.geoBlock &&
    ctx?.location &&
    rule.conditions.geoBlock.includes(ctx.location)
  ) {
    return "DENY";
  }

  // Time window
  if (rule.conditions.timeWindow) {

    const now = new Date().getHours();

    if (
      now < rule.conditions.timeWindow.start ||
      now > rule.conditions.timeWindow.end
    ) {
      return "DENY";
    }
  }

  return rule.effect;
}

// -----------------------------------------------------
// RULE MATCHER
// -----------------------------------------------------

function matchRules(
  rules: PolicyRule[],
  event: PolicyEvent
): PolicyRule[] {

  return rules
    .filter(
      r =>
        r.resource === event.resource &&
        r.action === event.action
    )
    .sort((a, b) => b.priority - a.priority);
}

// -----------------------------------------------------
// MAIN REAL-TIME ENGINE
// -----------------------------------------------------

export function evaluatePolicy(
  event: PolicyEvent
): {

  decision: Decision;

  matchedRules: number;

  reason: string;

} {

  const cacheKey =
    `${event.orgId}:${event.resource}`;

  const rules =
    policyCache.get(cacheKey) || [];

  const matched =
    matchRules(rules, event);

  // No rules → default DENY (zero trust)
  if (matched.length === 0) {

    return {

      decision: "DENY",

      matchedRules: 0,

      reason: "NO_POLICY_FOUND_ZERO_TRUST_BLOCK"
    };
  }

  // Evaluate top priority rule first
  for (const rule of matched) {

    const result =
      evaluateRule(rule, event);

    if (result) {

      return {

        decision: result,

        matchedRules: matched.length,

        reason: `RULE_MATCH:${rule.id}`
      };
    }
  }

  return {

    decision: "DENY",

    matchedRules: matched.length,

    reason: "FALLBACK_DENY"
  };
}

// -----------------------------------------------------
// REAL-TIME POLICY UPDATE (HOT RELOAD)
// -----------------------------------------------------

export function updatePolicyCache(
  orgId: string,
  resource: Resource,
  rules: PolicyRule[]
) {

  const key = `${orgId}:${resource}`;

  policyCache.set(key, rules);
}

// -----------------------------------------------------
// STREAM EVENT HOOK (FOR SUPABASE / WEBHOOK)
// -----------------------------------------------------

export async function policyStreamHandler(
  event: PolicyEvent
) {

  const result =
    evaluatePolicy(event);

  // LOG DECISION (for analytics engine)
  console.log("POLICY_DECISION", {

    user: event.userId,

    resource: event.resource,

    action: event.action,

    decision: result.decision,

    reason: result.reason
  });

  return result;
}
