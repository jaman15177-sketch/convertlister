import { createClient } from "@supabase/supabase-js"

let supabase: any = null

export function getSupabase() {

  if (supabase) return supabase

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error("Missing Supabase env")
  }

  // 🚀 IMPORTANT: DISABLE realtime
  supabase = createClient(url, key, {
    realtime: {
      params: {
        eventsPerSecond: 0
      }
    }
  })

  return supabase
}
