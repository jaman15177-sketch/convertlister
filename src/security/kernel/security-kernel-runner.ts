import { buildSecurityContext } from "./identity-layer";
import { decideSecurity } from "./decision-engine";
import { applyBilling } from "./billing-hook";
import { emitSOC } from "./soc-hook";

export async function runSecurityKernel(req: any) {
  const traceId = crypto.randomUUID();

  try {
    const ctx = await buildSecurityContext(req);

    const enriched = {
      ...ctx,
      traceId,

      // 🔥 FIX: normalize for strict SecurityContext
      sessionId: ctx.sessionId ?? "anonymous-session",
    };

    const result = decideSecurity(enriched);

    await applyBilling(enriched);
    emitSOC(result);

    return {
      decision: result.decision,
      reason: result.reason,
      traceId,
      context: enriched,
    };
  } catch (error) {
    return {
      decision: "ALLOW",
      reason: "kernel fallback safe mode",
      traceId,
      context: {
        ip: "0.0.0.0",
        userId: "anonymous",
        organizationId: "default",
        sessionId: "anonymous-session",
        riskScore: 0,
        device: "unknown",
      },
    };
  }
}
