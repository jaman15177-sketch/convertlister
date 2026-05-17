import { supabase } from "../../lib/supabase"

export async function createLog(
  jobId: string,
  level: "info" | "success" | "error" | "retry",
  message: string
) {
  const { error } = await supabase
    .from("logs")
    .insert([
      {
        job_id: jobId,
        level,
        message,
        created_at: new Date()
      }
    ])

  if (error) {
    console.error("❌ LOG FAILED:", error.message)
  }
}
