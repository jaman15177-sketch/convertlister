import { getSupabase } from "../../lib/supabase-client";

const supabase = getSupabase();

export async function runBatch() {
  console.log("Batch runner started");

  return {
    success: true,
    message: "Batch process completed",
    data: [],
  };
}
