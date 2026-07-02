import { Server } from "http";
import { WebSocketServer } from "ws";

let wss: WebSocketServer;

export function initSOCWebSocket(server: Server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "SOC_INIT", status: "CONNECTED" }));
  });
}

export function pushSOCEvent(event: any) {
  if (!wss) return;

  const data = JSON.stringify(event);

  wss.clients.forEach((client) => {
    client.send(data);
  });
}
