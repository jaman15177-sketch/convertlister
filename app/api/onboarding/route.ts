import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";

export async function POST(req: Request) {
  // =========================
  // AUTH CHECK
  // =========================
  const user = await getUser(req);

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const supabase = await createClient();

  // =========================
  // CHECK EXISTING ONBOARDING
  // =========================
  const { data: existing, error: fetchError } = await supabase
    .from("organizations")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchError) {
    return Response.json(
      { error: "Failed to check onboarding" },
      { status: 500 }
    );
  }

  if (existing) {
    return Response.json({
      success: true,
      message: "Already onboarded",
    });
  }

  // =========================
  // CREATE ORGANIZATION
  // =========================
  const { data, error } = await supabase
    .from("organizations")
    .insert({
      user_id: user.id,
      name: "Default Organization",
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return Response.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }

  // =========================
  // RESPONSE
  // =========================
  return Response.json({
    success: true,
    organization: data,
  });
}
