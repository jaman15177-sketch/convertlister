import { SupabaseClient } from "@supabase/supabase-js";

export class AuditLogger {
  constructor(private supabase: SupabaseClient) {}

  async log(params: {
    organizationId: string;
    actorId: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, any>;
    ipAddress?: string;
  }) {
    const { error } = await this.supabase
      .from("audit_logs")
      .insert({
        organization_id: params.organizationId,
        actor_id: params.actorId,
        action: params.action,
        entity_type: params.entityType,
        entity_id: params.entityId,
        metadata: params.metadata ?? {},
        ip_address: params.ipAddress
      });

    if (error) {
      console.error("AUDIT_LOG_ERROR", error);
    }
  }
}
