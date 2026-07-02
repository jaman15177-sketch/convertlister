export type TenantContext = {
  organizationId: string;
  userId?: string;
  role?: string;
};

export function enforceTenant(ctx: TenantContext) {
  if (!ctx?.organizationId) {
    throw new Error("TENANT_MISSING");
  }

  if (ctx.organizationId.length < 3) {
    throw new Error("TENANT_INVALID");
  }

  return true;
}

/**
 * Hard boundary check
 */
export function assertSameTenant(a: string, b: string) {
  if (a !== b) {
    throw new Error("TENANT_MISMATCH_BLOCKED");
  }
}
