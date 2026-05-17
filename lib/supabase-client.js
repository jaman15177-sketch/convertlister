"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabase = getSupabase;
const supabase_js_1 = require("@supabase/supabase-js");
let supabase = null;
function getSupabase() {
    if (supabase)
        return supabase;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        throw new Error("Missing Supabase env");
    }
    // 🚀 IMPORTANT: DISABLE realtime
    supabase = (0, supabase_js_1.createClient)(url, key, {
        realtime: {
            params: {
                eventsPerSecond: 0
            }
        }
    });
    return supabase;
}
