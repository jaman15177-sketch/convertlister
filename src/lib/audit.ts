import { supabase } from "./supabase";

export async function logAudit(
  userId: string,
  action: string,
  meta: any = {}
) {
  await supabase.from("audit_logs").insert({
    user_id: userId,
    action,
    meta,
  });
}
