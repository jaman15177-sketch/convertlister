"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
const server_1 = require("../supabase/server");
async function getUser(req) {
    const supabase = await (0, server_1.createClient)();
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
        return null;
    const token = authHeader.replace("Bearer ", "");
    if (!token)
        return null;
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user)
        return null;
    return data.user;
}
