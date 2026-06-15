const { WebSocketServer } = require("ws");

let wss;
const clients = new Set();

function initWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    console.log("🔥 WS CLIENT CONNECTED");

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
}

function broadcast(event) {
  const data = JSON.stringify(event);

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(data);
    }
  }
}

module.exports = {
  initWebSocket,
  broadcast,
};
