"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = createLog;
const supabase_1 = require("../../lib/supabase");
async function createLog(jobId, level, message) {
    const { error } = await supabase_1.supabase
        .from("logs")
        .insert([
        {
            job_id: jobId,
            level,
            message,
            created_at: new Date()
        }
    ]);
    if (error) {
        console.error("❌ LOG FAILED:", error.message);
    }
}
