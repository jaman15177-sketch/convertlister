"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_server_1 = require("../lib/core/realtime/ws-server");
const interval_1 = require("../core/scheduler/interval");
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
function startServer() {
    try {
        console.log("🚀 Starting SaaS v3 Runtime...");
        // ----------------------------------
        // Auto Import Scheduler
        // ----------------------------------
        interval_1.intervalScheduler.start(300000);
        // ----------------------------------
        // Minimal HTTP Server
        // ----------------------------------
        const httpServer = (0, http_1.createServer)((req, res) => {
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify({
                status: "ok",
                service: "convertlister",
                timestamp: new Date().toISOString(),
            }));
        });
        // ----------------------------------
        // WebSocket Bootstrap
        // ----------------------------------
        (0, ws_server_1.initWebSocket)(httpServer);
        // ----------------------------------
        // Listen
        // ----------------------------------
        httpServer.listen(PORT, () => {
            console.log("🚀 Server Running");
            console.log(`🌐 Port: ${PORT}`);
            console.log("⚡ WebSocket Active");
            console.log("🔁 Import Scheduler Active");
        });
    }
    catch (error) {
        console.error("❌ Startup failed:", error);
        process.exit(1);
    }
}
startServer();
