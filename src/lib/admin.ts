import { supabase } from "@/lib/supabase";

export async function isAdmin(userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error) return false;

  return data?.role === "admin";
}
