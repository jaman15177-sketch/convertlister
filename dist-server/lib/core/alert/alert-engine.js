"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAlert = processAlert;
const server_admin_1 = require("../../supabase/server-admin");
async function processAlert(event) {
    const { data: existing } = await server_admin_1.supabaseAdmin
        .from("alerts")
        .select("*")
        .eq("job_id", event.job_id)
        .eq("message", event.message)
        .maybeSingle();
    if (existing) {
        const frequency = (existing.frequency ?? 0) + 1;
        const { data } = await server_admin_1.supabaseAdmin
            .from("alerts")
            .update({
            frequency,
            severity: 10 + frequency,
            updated_at: new Date().toISOString(),
        })
            .eq("id", existing.id)
            .select()
            .single();
        return {
            updated: true,
            data,
        };
    }
    const { data } = await server_admin_1.supabaseAdmin
        .from("alerts")
        .insert({
        job_id: event.job_id,
        level: event.level,
        message: event.message,
        status: "open",
        frequency: 1,
        severity: 11,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    })
        .select()
        .single();
    return {
        created: true,
        data,
    };
}
