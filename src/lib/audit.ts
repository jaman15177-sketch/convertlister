import { supabase } from "@/core/ssot/db/supabase.client";

export type AuditInput = {
  actorId: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, any>;
  organizationId?: string;
};

/**
 * ✅ MAIN AUDIT FUNCTION
 */
export async function logAudit(input: AuditInput) {
  const { error } = await supabase.from("audit_logs").insert({
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    metadata: input.metadata ?? {},
    organization_id: input.organizationId ?? null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("audit error:", error.message);
  }
}

/**
 * backward compatibility (OLD CODE SUPPORT)
 */
export const audit = logAudit;
