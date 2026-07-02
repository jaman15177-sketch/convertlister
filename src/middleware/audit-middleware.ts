import { logAudit } from "@/lib/audit";

export async function auditMiddleware(
  req: any,
  res: any,
  next: Function
) {
  const start = Date.now();

  res.on("finish", async () => {
    await logAudit({
      organizationId:
        req.tenant?.organizationId || "unknown",

      actorId:
        req.user?.id || "anonymous",

      action: "API_CALL",

      entityType: "api_request",

      metadata: {
        path: req.url,
        status: res.statusCode,
        duration: Date.now() - start,
        ip: req.socket?.remoteAddress,
      },
    });
  });

  next();
}
