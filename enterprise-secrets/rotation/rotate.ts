import crypto from "crypto";

import { encrypt } from "../crypto/encryption";
import { nextVersion } from "../versioning/versions";
import { auditLog } from "../audit/audit-db";

export async function rotateSecret(name: string) {
  const raw = crypto.randomBytes(32).toString("hex");

  const encrypted = encrypt(raw);

  const version = nextVersion(name);

  await auditLog({
    type: "SECRET_ROTATED",
    secret: name,
    version,
    timestamp: new Date().toISOString(),
  });

  return {
    name,
    version,
    encrypted,
  };
}
