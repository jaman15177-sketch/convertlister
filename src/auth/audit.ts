type AuditMeta = {
  userId?: string;
  ip?: string;
  [key: string]: unknown;
};

export function auditLog(action: string, meta: AuditMeta = {}) {
  console.log("[AUDIT]", {
    action,
    meta,
    timestamp: Date.now(),
  });
}
