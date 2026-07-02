import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "@supabase/supabase-js";

/**
 * =========================================
 * REALTIME GATEWAY (SUPABASE AUTH ONLY)
 * =========================================
 */

type ClientMeta = {
  socket: WebSocket;
  userId: string;
  organizationId: string;
};

type TenantMap = Map<string, Set<ClientMeta>>;

export class RealtimeGateway {
  private wss: WebSocketServer;
  private clients: TenantMap = new Map();

  private supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server });
    this.init();
  }

  private init() {
    this.wss.on("connection", (socket, req) => {
      this.handleConnection(socket, req);
    });
  }

  /**
   * EXTRACT TOKEN
   */
  private extractToken(req: http.IncomingMessage): string | null {
    const url = new URL(req.url || "", "http://localhost");

    const queryToken = url.searchParams.get("token");
    if (queryToken) return queryToken;

    const auth = req.headers["authorization"];
    if (!auth) return null;

    if (auth.startsWith("Bearer ")) {
      return auth.replace("Bearer ", "");
    }

    return null;
  }

  /**
   * VERIFY USING SUPABASE
   */
  private async verifyToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) return null;

    return data.user;
  }

  /**
   * HANDLE CONNECTION
   */
  private async handleConnection(
    socket: WebSocket,
    req: http.IncomingMessage
  ) {
    const token = this.extractToken(req);

    if (!token) {
      socket.close(1008, "Missing token");
      return;
    }

    const user = await this.verifyToken(token);

    if (!user) {
      socket.close(1008, "Invalid token");
      return;
    }

    const metadata = user.user_metadata || {};

    const client: ClientMeta = {
      socket,
      userId: user.id,
      organizationId: metadata.organizationId || "unknown",
    };

    this.addClient(client);

    socket.on("message", (msg) => {
      this.handleMessage(client, msg.toString());
    });

    socket.on("close", () => {
      this.removeClient(client);
    });
  }

  private addClient(client: ClientMeta) {
    if (!this.clients.has(client.organizationId)) {
      this.clients.set(client.organizationId, new Set());
    }

    this.clients.get(client.organizationId)!.add(client);
  }

  private removeClient(client: ClientMeta) {
    const set = this.clients.get(client.organizationId);
    if (!set) return;

    set.delete(client);

    if (set.size === 0) {
      this.clients.delete(client.organizationId);
    }
  }

  private handleMessage(client: ClientMeta, raw: string) {
    try {
      const event = JSON.parse(raw);

      this.broadcast(client.organizationId, {
        type: event.type || "UNKNOWN",
        payload: event.payload,
        organizationId: client.organizationId,
        userId: client.userId,
        timestamp: Date.now(),
      });
    } catch {
      // ignore invalid payload
    }
  }

  public broadcast(organizationId: string, event: unknown) {
    const clients = this.clients.get(organizationId);
    if (!clients) return;

    const data = JSON.stringify(event);

    for (const client of clients) {
      if (client.socket.readyState === WebSocket.OPEN) {
        client.socket.send(data);
      }
    }
  }
}
