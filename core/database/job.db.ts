import { supabase } from "../../lib/supabase"

// =========================
// CREATE JOB (PERSISTENCE)
// =========================
export async function createJobRecord(job: any) {
  const { error } = await supabase
    .from("jobs")
    .insert({
      job_id: job.jobId,
      url: job.url,
      url_hash: job.urlHash,
      status: "queued",
      retry_count: 0
    })

  if (error) {
    console.error("❌ CREATE JOB ERROR:", error.message)
  }
}

// =========================
// UPDATE JOB STATUS
// =========================
export async function updateJobStatus(
  jobId: string,
  status: string,
  retryCount: number = 0
) {
  const { error } = await supabase
    .from("jobs")
    .update({
      status,
      retry_count: retryCount,
      updated_at: new Date()
    })
    .eq("job_id", jobId)

  if (error) {
    console.error("❌ UPDATE STATUS ERROR:", error.message)
  }
}

// =========================
// GET SINGLE JOB
// =========================
export async function getJob(jobId: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("job_id", jobId)
    .single()

  if (error) {
    console.error("❌ GET JOB ERROR:", error.message)
  }

  return data
}
