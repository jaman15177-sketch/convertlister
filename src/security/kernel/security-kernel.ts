export type SecurityContext = {
  userId: string;
  organizationId: string;
  sessionId: string;
  riskScore: number;
  traceId: string;
};

export type SecurityDecision =
  | "ALLOW"
  | "BLOCK"
  | "CHALLENGE"
  | "RATE_LIMIT";

export type SecurityResult = {
  decision: SecurityDecision;
  reason: string;
  context: SecurityContext;
};
