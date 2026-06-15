import { WebSocketServer } from "ws";

let wss: WebSocketServer;

export function initWS(server: any) {
  wss = new WebSocketServer({ server });
}

export function broadcast(event: string, data: any) {
  if (!wss) return;

  const payload = JSON.stringify({ event, data });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}
