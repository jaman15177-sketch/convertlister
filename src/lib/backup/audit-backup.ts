type AuditEvent = {
  table: string;
  action: "INSERT" | "UPDATE" | "DELETE";
  organizationId: string;
  userId?: string;
  payload: any;
  timestamp: number;
};

export async function auditBackup(event: AuditEvent) {
  try {
    // 1. Primary backup (external webhook / storage)
    await fetch(process.env.BACKUP_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    // 2. Optional: Redis stream backup (if available)
    if (process.env.REDIS_URL) {
      try {
        const { createClient } = await import("redis");

        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();

        await client.xAdd("audit-log-stream", "*", {
          data: JSON.stringify(event),
        });

        await client.disconnect();
      } catch (err) {
        console.warn("Redis audit backup failed (non-blocking)");
      }
    }

    return true;
  } catch (err) {
    console.error("Audit backup failed:", err);
    return false;
  }
}
