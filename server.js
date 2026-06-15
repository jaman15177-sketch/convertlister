const { createServer } = require("http");
const next = require("next");
const { initWebSocket } = require("./src/lib/realtime/ws-server");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  // 🔥 WebSocket attach here
  initWebSocket(server);

  server.listen(3000, () => {
    console.log("🚀 SaaS v4 running on http://localhost:3000");
    console.log("⚡ WebSocket enabled on same server");
  });
});
