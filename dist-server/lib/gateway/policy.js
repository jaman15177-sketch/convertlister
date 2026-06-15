"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
exports.billingGuard = billingGuard;
exports.rateLimitGuard = rateLimitGuard;
function authGuard(ctx) {
    if (!ctx.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
}
function billingGuard(ctx) {
    if (ctx.org.credits <= 0) {
        return Response.json({ error: "Out of credits" }, { status: 402 });
    }
    return null;
}
function rateLimitGuard() {
    // simplified stub (replace with redis later)
    return null;
}
