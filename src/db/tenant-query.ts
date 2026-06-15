import { supabase } from "../auth/supabase";

export async function tenantQuery(
  table: string,
  tenantId: string
) {
  return supabase
    .from(table)
    .select("*")
    .eq("tenant_id", tenantId);
}
