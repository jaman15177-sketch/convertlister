// 🧠 MVP AUDIT LAYER (SaaS-ready stub)
// Later upgrade → Supabase / DB / Kafka

type AuditEvent = {
  userId: string;
  action: string;
  metadata?: any;
  timestamp: string;
};

const memoryLog: AuditEvent[] = [];

export async function logAudit(
  userId: string,
  action: string,
  metadata?: any
) {
  const event: AuditEvent = {
    userId,
    action,
    metadata,
    timestamp: new Date().toISOString(),
  };

  memoryLog.push(event);

  // dev visibility
  console.log("AUDIT_EVENT:", event);

  return { success: true };
}

export function getAuditLogs() {
  return memoryLog;
}
