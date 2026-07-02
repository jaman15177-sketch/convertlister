import type { WebSocketServer } from "ws";
import { eventBus } from "../ws/ws-bus";

let wss: WebSocketServer;

/**
 * Attach WebSocket server to event bus
 */
export function initWS(server: WebSocketServer) {
  wss = server;

  eventBus.onEvent("event", (payload) => {
    broadcast(JSON.stringify(payload));
  });
}

function broadcast(message: string) {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}
