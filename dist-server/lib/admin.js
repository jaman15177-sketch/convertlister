"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
const supabase_1 = require("./supabase");
async function isAdmin(userId) {
    const { data } = await supabase_1.supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();
    return data?.role === "admin";
}
