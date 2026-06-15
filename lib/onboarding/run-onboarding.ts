import { createClient } from "@/lib/supabase/server";
import { ONBOARDING_STATUS } from "./constants";

export async function runOnboarding(user: any) {
  const supabase = await createClient();

  // =========================
  // 1. CHECK EXISTING USER
  // =========================
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (existingUser?.onboarding_status === ONBOARDING_STATUS.ACTIVE) {
    return {
      alreadyOnboarded: true,
      user: existingUser,
    };
  }

  // =========================
  // 2. CREATE / UPDATE USER PROFILE
  // =========================
  await supabase.from("users").upsert({
    id: user.id,
    email: user.email,
    onboarding_status: ONBOARDING_STATUS.PROFILE_CREATED,
  });

  // =========================
  // 3. CREATE ORGANIZATION
  // =========================
  const { data: org } = await supabase
    .from("organizations")
    .insert({
      name: `${user.email}'s Workspace`,
      owner_id: user.id,
    })
    .select()
    .single();

  // =========================
  // 4. ASSIGN MEMBER ROLE
  // =========================
  await supabase.from("organization_members").insert({
    user_id: user.id,
    organization_id: org.id,
    role: "owner",
  });

  // =========================
  // 5. INITIAL CREDITS (SAAS ENGINE)
  // =========================
  await supabase.from("credits").insert({
    user_id: user.id,
    balance: 100,
  });

  // =========================
  // 6. FINALIZE ONBOARDING
  // =========================
  await supabase
    .from("users")
    .update({
      organization_id: org.id,
      onboarding_status: ONBOARDING_STATUS.ACTIVE,
      onboarding_complete: true,
    })
    .eq("id", user.id);

  return {
    alreadyOnboarded: false,
    organization: org,
    credits: 100,
  };
}
