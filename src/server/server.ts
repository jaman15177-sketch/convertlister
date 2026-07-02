import http from "http";

import { intervalScheduler } from "../core/scheduler/interval";
import { assertEnv } from "@/lib/env/validate-env";
import { RealtimeGateway } from "../realtime/cluster/gateway/ws-gateway";

import { getMetrics } from "@/observability/metrics";
import { startTracing } from "@/observability/tracing";
import { log } from "@/observability/logger";

import { startWorker } from "@/queue/queue";

import { logAudit } from "@/observability/audit/audit";

import { buildIdentityV3 } from "@/security/iam/v3/core";

import { initSOCWebSocket, pushSOCEvent } from "@/soc/ws/soc-server";
import { calculateRiskV2 } from "@/soc/engine/risk-engine-v2";
import { autonomousSecurityOS } from "@/security/autonomous/security-os";

import { trackUsage } from "@/billing/engine/billing-core";

const PORT = Number(process.env.PORT || 3000);

let isReady = false;
let isShuttingDown = false;

async function startServer() {
  assertEnv();
  startTracing();

  intervalScheduler.start(300000);
  startWorker();

  const server = http.createServer(async (req: any, res: any) => {
    try {
      if (isShuttingDown) {
        res.statusCode = 503;
        return res.end("Shutting down");
      }

      const url = req.url || "/";
      const method = req.method || "GET";

      const identity = await buildIdentityV3(req);

      await trackUsage(identity.userId, "api_call", 1);

      void logAudit({
        organizationId: identity.organizationId,
        userId: identity.userId,
        action: "API_CALL",
        metadata: {
          path: url,
          method,
        },
        createdAt: Date.now(),
      });

      const riskResult = calculateRiskV2({
  ip: identity.device.ip,
  organizationId: identity.organizationId,
  path: url,

  userId: identity.userId,
  role: identity.role,

  sessionId: identity.sessionId,

  deviceFingerprint:
    identity.device.fingerprint,
});

const risk = riskResult.score;
      if (risk > 80) {
  const action = await autonomousSecurityOS({
    organizationId: identity.organizationId,
    userId: identity.userId,
    sessionId: identity.sessionId,
    riskScore: risk,
    ip: identity.device.ip,
  });

  if (action === "REVOKE_SESSION") {
    console.log("SESSION REVOKE TRIGGERED");
  }

  if (action === "BLOCK") {
    console.log("USER BLOCKED BY AUTONOMOUS OS");
  }

  pushSOCEvent({
    type: "FRAUD",
    organizationId: identity.organizationId,
    userId: identity.userId,
    sessionId: identity.sessionId,

    riskScore: risk,
    riskLevel: riskResult.level,
    riskReasons: riskResult.reasons,

    ip: identity.device.ip,
    userAgent: identity.device.userAgent,
    fingerprint: identity.device.fingerprint,

    role: identity.role,
    timestamp: Date.now(),
  });
}
              if (url === "/health") {
        return res.end(JSON.stringify({ status: "ok" }));
      }

      if (url === "/metrics") {
        const metrics = await getMetrics();
        return res.end(metrics);
      }

      return res.end(
        JSON.stringify({
          service: "convertlister",
          organization: identity.organizationId,
          user: identity.userId,
          risk,
        })
      );
    } catch (err: any) {
      res.statusCode = 401;

      return res.end(
        JSON.stringify({
          error: err?.message || "UNAUTHORIZED",
        })
      );
    }
  });

  /**
   * WEBSOCKET SOC LAYER
   */
  try {
    initSOCWebSocket(server);
    new RealtimeGateway(server);
  } catch (e) {
    console.warn("WebSocket disabled:", e);
  }

  server.listen(PORT, () => {
    isReady = true;

    log("info", "Server started");

    console.log("==================================");
    console.log("🚀 ENTERPRISE SECURITY OS ACTIVE");
    console.log(`🌐 PORT: ${PORT}`);
    console.log("==================================");
  });
}

startServer();
