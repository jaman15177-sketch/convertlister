import { createSupabaseServer } from "@/lib/supabase/server";

interface UpdateMeta {
  attempts?: number;
  failed_reason?: string;
}

export async function updateJobState(
  jobId: string,
  status: string,
  meta?: UpdateMeta
) {
  const supabase = await createSupabaseServer();

  await supabase
    .from("jobs")
    .update({
      status,
      attempts: meta?.attempts ?? 0,
      failed_reason: meta?.failed_reason ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  return {
    success: true,
  };
}
