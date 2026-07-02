import { supabase } from "@/core/ssot/db/supabase.client";
import type { Json } from "@/types/database";

export type LogAuditInput = {
  organizationId: string;
  userId: string;
  action: string;
  metadata?: Record<string, unknown>;
  entityType?: string;
  entityId?: string | null;
};

export async function logAudit({
  organizationId,
  userId,
  action,
  metadata = {},
  entityType = "system",
  entityId = null,
}: LogAuditInput) {
  const { error } = await supabase
    .from("audit_logs")
    .insert({
      organization_id: organizationId,
      actor_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata as Json,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error("audit error:", error.message);
  }
}
