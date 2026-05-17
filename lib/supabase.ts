import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

// ======================
// FORCE LOAD .env.local
// ======================
dotenv.config({ path: ".env.local" })

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "❌ ENV NOT LOADED - CHECK .env.local"
  )
}

export const supabase =
  createClient(supabaseUrl, supabaseKey)
