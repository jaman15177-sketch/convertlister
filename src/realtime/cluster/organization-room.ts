import { WebSocket } from "ws";

/**
 * ==========================================================
 * ORGANIZATION WEBSOCKET ISOLATION
 * ==========================================================
 */

const rooms = new Map<string, Set<WebSocket>>();

export function joinOrganizationRoom(
  organizationId: string,
  socket: WebSocket
): void {
  if (!rooms.has(organizationId)) {
    rooms.set(organizationId, new Set());
  }

  rooms.get(organizationId)!.add(socket);

  socket.on("close", () => {
    const room = rooms.get(organizationId);

    if (!room) return;

    room.delete(socket);

    if (room.size === 0) {
      rooms.delete(organizationId);
    }
  });
}

export function broadcastOrganization(
  organizationId: string,
  data: unknown
): void {
  const room = rooms.get(organizationId);

  if (!room) return;

  const payload = JSON.stringify(data);

  for (const socket of room) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(payload);
    }
  }
}

export function getOrganizationRoomSize(
  organizationId: string
): number {
  return rooms.get(organizationId)?.size ?? 0;
}

export function removeOrganizationRoom(
  organizationId: string
): void {
  rooms.delete(organizationId);
}
