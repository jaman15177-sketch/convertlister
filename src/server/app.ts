import type { createServer, IncomingMessage, ServerResponse } from "http";

/**
 * Minimal HTTP app layer
 * (replace with Express/Fastify later if needed)
 */

export const app = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/health") {
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.end(JSON.stringify({ message: "SaaS v3 server running" }));
};
