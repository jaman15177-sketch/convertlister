import { TenantContext } from "../types/tenant";

export function resolveTenant(req: any): TenantContext {
  const tenantId =
    req.headers["x-tenant-id"] ||
    req.headers["X-Tenant-Id"];

  if (!tenantId) {
    throw new Error("TENANT_ID_MISSING");
  }

  return {
    tenantId: String(tenantId),
    userId: req.user?.id || "anonymous",
    role: req.user?.role || "member",
  };
}
