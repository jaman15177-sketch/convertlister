import { WebSocketServer } from "ws";

type AttackEvent = {
  type: "API_ATTACK" | "FRAUD" | "TENANT_BREACH" | "RATE_LIMIT";
  organizationId: string;
  riskScore: number;
  ip: string;
  timestamp: number;
};

const clients = new Set<any>();

export function initSOCWebSocket(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.send(
      JSON.stringify({
        type: "SYSTEM",
        message: "SOC stream connected",
      })
    );

    ws.on("close", () => clients.delete(ws));
  });
}

/**
 * 🔥 Push live attack event
 */
export function pushAttackEvent(event: AttackEvent) {
  const payload = JSON.stringify(event);

  for (const client of clients) {
    try {
      client.send(payload);
    } catch {}
  }
}
