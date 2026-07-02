export interface AuditLog {
  organizationId: string;
  userId?: string;
  action: string;
  metadata?: any;
  ip?: string;
  createdAt: number;
}

export function logAudit(log: AuditLog) {
  const payload = {
    ...log,
    createdAt: Date.now(),
  };

  fetch(process.env.AUDIT_WEBHOOK_URL || "", {
    method: "POST",
    body: JSON.stringify(payload),
  }).catch(() => {});
}
