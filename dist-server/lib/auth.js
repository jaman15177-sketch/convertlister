"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
const supabase_1 = require("./supabase");
/**
 * Get user from request token
 */
async function getUser(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
        return null;
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase_1.supabase.auth.getUser(token);
    if (error || !data.user)
        return null;
    return data.user;
}
