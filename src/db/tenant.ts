import { supabase } from "../auth/supabase";

export async function getTenant(tenantId: string) {
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenantId)
    .single();

  if (error) return null;

  return data;
}
