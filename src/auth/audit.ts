export function auditLog(action: string, meta: any) {
  console.log("[AUDIT]", {
    action,
    meta,
    time: new Date().toISOString(),
  });
}
