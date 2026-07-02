export type RiskInput = {
  ip: string;
  organizationId: string;
  path: string;

  userId?: string;
  role?: string;

  sessionId?: string;

  failedLogins?: number;
  geoMismatch?: boolean;

  deviceFingerprint?: string;
  knownDeviceFingerprint?: string;
};

export type RiskResult = {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  reasons: string[];
};

export function calculateRiskV2(
  input: RiskInput
): RiskResult {
  let score = 0;

  const reasons: string[] = [];

  /**
   * IP RISK
   */
  if (
    !input.ip ||
    input.ip === "unknown"
  ) {
    score += 30;
    reasons.push("UNKNOWN_IP");
  }

  /**
   * FAILED LOGIN RISK
   */
  if (
    input.failedLogins &&
    input.failedLogins >= 3
  ) {
    score += 40;
    reasons.push("FAILED_LOGINS");
  }

  /**
   * GEO RISK
   */
  if (input.geoMismatch) {
    score += 25;
    reasons.push("GEO_MISMATCH");
  }

  /**
   * ADMIN TARGET RISK
   */
  if (
    input.path.includes("/admin")
  ) {
    score += 20;
    reasons.push("ADMIN_ENDPOINT");
  }

  /**
   * SESSION RISK
   */
  if (
    !input.sessionId ||
    input.sessionId === "no-session"
  ) {
    score += 25;
    reasons.push("NO_SESSION");
  }

  /**
   * DEVICE MISMATCH
   */
  if (
    input.knownDeviceFingerprint &&
    input.deviceFingerprint &&
    input.knownDeviceFingerprint !==
      input.deviceFingerprint
  ) {
    score += 35;
    reasons.push("DEVICE_MISMATCH");
  }

  /**
   * ROLE RISK
   */
  if (
    input.role === "admin" &&
    score > 30
  ) {
    score += 15;
    reasons.push("ADMIN_ACCOUNT_RISK");
  }

  score = Math.min(score, 100);

  let level: RiskResult["level"] =
    "LOW";

  if (score >= 25) {
    level = "MEDIUM";
  }

  if (score >= 60) {
    level = "HIGH";
  }

  if (score >= 85) {
    level = "CRITICAL";
  }

  return {
    score,
    level,
    reasons,
  };
}
