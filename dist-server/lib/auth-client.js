"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = getSession;
exports.getUser = getUser;
exports.logout = logout;
const supabase_1 = require("./supabase");
/**
 * Always get session safely
 */
async function getSession() {
    const { data } = await supabase_1.supabase.auth.getSession();
    return data.session;
}
/**
 * Get current user
 */
async function getUser() {
    const { data } = await supabase_1.supabase.auth.getUser();
    return data.user;
}
/**
 * Auto logout
 */
async function logout() {
    await supabase_1.supabase.auth.signOut();
}
