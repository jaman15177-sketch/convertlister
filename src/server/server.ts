import { createServer } from "http";

import { initWebSocket } from "../lib/core/realtime/ws-server";
import { intervalScheduler } from "../core/scheduler/interval";

const PORT = Number(process.env.PORT || 3000);

/**
 * ==========================================================
 * SaaS v3 Runtime Server
 * ==========================================================
 * - Scheduler bootstrap
 * - WebSocket bootstrap
 * - HTTP server
 * ==========================================================
 */

function startServer(): void {
  try {
    console.log("🚀 Starting SaaS v3 Runtime...");

    // ----------------------------------
    // Auto Import Scheduler
    // ----------------------------------
    intervalScheduler.start(300000);

    // ----------------------------------
    // Minimal HTTP Server
    // ----------------------------------
    const httpServer = createServer((req, res) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          status: "ok",
          service: "convertlister",
          timestamp: new Date().toISOString(),
        })
      );
    });

    // ----------------------------------
    // WebSocket Bootstrap
    // ----------------------------------
    initWebSocket(httpServer);

    // ----------------------------------
    // Listen
    // ----------------------------------
    httpServer.listen(PORT, () => {
      console.log("🚀 Server Running");
      console.log(`🌐 Port: ${PORT}`);
      console.log("⚡ WebSocket Active");
      console.log("🔁 Import Scheduler Active");
    });

  } catch (error) {
    console.error("❌ Startup failed:", error);
    process.exit(1);
  }
}

startServer();
