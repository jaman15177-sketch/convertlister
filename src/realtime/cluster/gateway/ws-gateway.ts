import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { RedisEventBus, ClusterEvent } from "../bus/redis-bus";

type ClientMap = Map<string, WebSocket[]>;

export class RealtimeGateway {
  private wss: WebSocketServer;
  private clients: ClientMap = new Map();
  private bus = new RedisEventBus();

  constructor(port: number, redisChannel = "saas-events") {
    const server = http.createServer();
    this.wss = new WebSocketServer({ server });

    server.listen(port);

    /**
     * Listen Redis events (cluster-wide)
     */
    this.bus.subscribe(redisChannel, (event) => {
      this.broadcast(event.tenantId, event);
    });

    /**
     * WebSocket connections
     */
    this.wss.on("connection", (ws) => {
      let tenantId: string | null = null;

      ws.on("message", (msg) => {
        const data = JSON.parse(msg.toString());

        if (data.type === "SUBSCRIBE") {
          const incomingTenantId = data.tenantId;

          if (typeof incomingTenantId !== "string" || !incomingTenantId) {
            ws.close();
            return;
          }

          tenantId = incomingTenantId;

          let clients = this.clients.get(tenantId);

          if (!clients) {
            clients = [];
            this.clients.set(tenantId, clients);
          }

          clients.push(ws);

          ws.send(
            JSON.stringify({
              type: "CONNECTED",
              tenantId,
            })
          );
        }
      });

      ws.on("close", () => {
        if (!tenantId) return;

        const list = this.clients.get(tenantId) || [];

        this.clients.set(
          tenantId,
          list.filter((c) => c !== ws)
        );
      });
    });
  }

  broadcast(tenantId: string, event: ClusterEvent) {
    const clients = this.clients.get(tenantId) || [];

    for (const ws of clients) {
      if (ws.readyState === ws.OPEN) {
        ws.send(
          JSON.stringify({
            type: "UPDATE",
            tenantId,
            event,
          })
        );
      }
    }
  }
}
