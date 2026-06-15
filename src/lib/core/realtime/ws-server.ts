import { WebSocketServer } from "ws";
import { eventBus } from "../bus/event-bus";

let wss: WebSocketServer;

export function initWebSocket(server: any) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "connected" }));
  });

  eventBus.on("alert.created", (data) => {
    broadcast({ type: "alert.created", data });
  });

  eventBus.on("alert.updated", (data) => {
    broadcast({ type: "alert.updated", data });
  });
}

function broadcast(payload: any) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  });
}
