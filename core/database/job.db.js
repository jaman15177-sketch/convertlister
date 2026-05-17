"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobRecord = createJobRecord;
exports.updateJobStatus = updateJobStatus;
exports.getJob = getJob;
const supabase_1 = require("../../lib/supabase");
// =========================
// CREATE JOB (PERSISTENCE)
// =========================
async function createJobRecord(job) {
    const { error } = await supabase_1.supabase
        .from("jobs")
        .insert({
        job_id: job.jobId,
        url: job.url,
        url_hash: job.urlHash,
        status: "queued",
        retry_count: 0
    });
    if (error) {
        console.error("❌ CREATE JOB ERROR:", error.message);
    }
}
// =========================
// UPDATE JOB STATUS
// =========================
async function updateJobStatus(jobId, status, retryCount = 0) {
    const { error } = await supabase_1.supabase
        .from("jobs")
        .update({
        status,
        retry_count: retryCount,
        updated_at: new Date()
    })
        .eq("job_id", jobId);
    if (error) {
        console.error("❌ UPDATE STATUS ERROR:", error.message);
    }
}
// =========================
// GET SINGLE JOB
// =========================
async function getJob(jobId) {
    const { data, error } = await supabase_1.supabase
        .from("jobs")
        .select("*")
        .eq("job_id", jobId)
        .single();
    if (error) {
        console.error("❌ GET JOB ERROR:", error.message);
    }
    return data;
}
