import crypto from "crypto";

export function createServiceIdentity(
  service: string
) {
  return {
    id: crypto.randomUUID(),
    service,
    createdAt: new Date().toISOString(),
  };
}
