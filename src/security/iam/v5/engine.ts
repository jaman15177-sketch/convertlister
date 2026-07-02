import { pushSOCEvent } from "@/soc/ws/soc-server";

export type IdentityV5 = {
  userId: string;
  organizationId: string;
  sessionId: string;
  riskScore: number;
  trustScore: number;
};

/**
 * 🧠 Behavioral fingerprinting
 */
function behaviorScore(req: any): number {
  const ua = req.headers["user-agent"] || "";
  const isBot = /bot|crawl/i.test(ua);
  return isBot ? 40 : 5;
}

/**
 * ⚡ Login velocity detection
 */
function loginVelocityScore(history: number[]): number {
  if (history.length > 5) return 25;
  return 5;
}

/**
 * 🌍 Geo travel anomaly detection
 */
function geoTravelScore(lastIP: string, currentIP: string): number {
  if (!lastIP || !currentIP) return 0;

  const lastPrefix = lastIP.split(".")[0];
  const currentPrefix = currentIP.split(".")[0];

  return lastPrefix !== currentPrefix ? 35 : 0;
}

/**
 * 🔐 Continuous trust scoring
 */
function computeTrust(risk: number): number {
  return Math.max(0, 100 - risk);
}

/**
 * 🚨 Auto revoke decision loop
 */
function shouldRevoke(trustScore: number): boolean {
  return trustScore < 30;
}

/**
 * 🚀 ADAPTIVE IDENTITY ENGINE V5
 */
export async function adaptiveIdentityEngineV5(input: {
  req: any;
  baseRisk: number;
  sessionId: string;
  userId: string;
  organizationId: string;
  lastIP?: string;
  loginHistory?: number[];
}) {
  const currentIP = input.req.socket?.remoteAddress || "unknown";

  let risk = input.baseRisk;

  // 1. Behavioral fingerprinting
  risk += behaviorScore(input.req);

  // 2. Login velocity detection
  risk += loginVelocityScore(input.loginHistory || []);

  // 3. Geo travel anomaly
  risk += geoTravelScore(input.lastIP || "", currentIP);

  const trustScore = computeTrust(risk);

  // 🚨 AUTO REVOKE LOOP
  if (shouldRevoke(trustScore)) {
    pushSOCEvent({
      type: "AUTO_REVOKE",
      userId: input.userId,
      organizationId: input.organizationId,
      sessionId: input.sessionId,
      riskScore: risk,
      trustScore,
      ip: currentIP,
      timestamp: Date.now(),
    });
  }

  return {
    userId: input.userId,
    organizationId: input.organizationId,
    sessionId: input.sessionId,
    riskScore: risk,
    trustScore,
  };
}
