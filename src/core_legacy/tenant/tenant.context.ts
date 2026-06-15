export interface TenantContext {
  tenantId: string;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  limits: {
    requestsPerMin: number;
    maxWorkers: number;
  };
}

export class TenantManager {
  private tenants = new Map<
    string,
    TenantContext
  >();

  register(tenant: TenantContext) {
    this.tenants.set(
      tenant.tenantId,
      tenant
    );
  }

  get(tenantId: string) {
    return this.tenants.get(
      tenantId
    );
  }

  enforceLimit(tenantId: string) {
    const t = this.tenants.get(
      tenantId
    );

    if (!t)
      throw new Error(
        "TENANT_NOT_FOUND"
      );

    return t.limits;
  }
}

export const tenantManager =
  new TenantManager();
