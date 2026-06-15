import { createClient } from "@/lib/supabase/server";

export async function ensureOrganization(userId: string) {
  const supabase = await createClient();

  // 1. check if org exists
  const { data: existing } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", userId)
    .single();

  if (existing) return existing;

  // 2. create organization
  const { data: org, error } = await supabase
    .from("organizations")
    .insert({
      name: "My Workspace",
      slug: `org-${userId.slice(0, 8)}`,
      owner_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  // 3. create owner membership
  await supabase.from("organization_members").insert({
    organization_id: org.id,
    user_id: userId,
    role: "OWNER",
  });

  // 4. create default workspace
  await supabase.from("workspaces").insert({
    organization_id: org.id,
    name: "Default Workspace",
  });

  return org;
}
