import { buildIdentityV3 } from "@/security/iam/v3/core";
import { calculateRiskV2 } from "@/soc/engine/risk-engine-v2";

/**
 * ==========================================================
 * SAFE SECURITY CONTEXT BUILDER (PRODUCTION SAFE)
 * ==========================================================
 */

export async function buildSecurityContext(req: any) {
  try {
    // =========================
    // Identity Layer
    // =========================
    const identity = await buildIdentityV3(req);

    // =========================
    // Risk Engine
    // =========================
    let riskScore = 0;

    try {
      const riskResult = calculateRiskV2({
        ip:
          req.headers?.get?.("x-forwarded-for") ||
          req.headers?.["x-forwarded-for"] ||
          "unknown",
        organizationId:
          identity?.organizationId || "default",
        path: req.url || "/",
      });

      riskScore = riskResult.score;
    } catch {
      riskScore = 0;
    }

    // =========================
    // RETURN SAFE CONTRACT
    // =========================
    return {
      userId: identity?.userId || "anonymous",
      organizationId:
        identity?.organizationId || "default",
      sessionId: identity?.sessionId || null,
      riskScore,
      device: identity?.device || "unknown",
    };
  } catch {
    // =========================
    // GLOBAL FALLBACK
    // =========================
    return {
      userId: "anonymous",
      organizationId: "default",
      sessionId: null,
      riskScore: 0,
      device: "unknown",
    };
  }
}
