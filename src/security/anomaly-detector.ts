import { logAudit } from "@/observability/audit/audit";

export async function detectAnomaly(data: {
  organizationId: string;
  userId?: string;
  action: string;
  riskScore: number;
  ip?: string;
}) {
  if (data.riskScore > 80) {
    await logAudit({
      organizationId: data.organizationId,
      userId: data.userId,
      action: "ANOMALY_DETECTED",
      metadata: data,
      ip: data.ip,
      createdAt: Date.now(),
    });

    return true;
  }

  return false;
}
