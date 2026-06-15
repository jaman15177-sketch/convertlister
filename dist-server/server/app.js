"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/**
 * Minimal HTTP app layer
 * (replace with Express/Fastify later if needed)
 */
const app = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/health") {
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }
    res.end(JSON.stringify({ message: "SaaS v3 server running" }));
};
exports.app = app;
