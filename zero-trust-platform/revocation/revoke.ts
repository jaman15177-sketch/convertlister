const revoked = new Set<string>();

export function revokeKey(keyId: string) {
  revoked.add(keyId);

  console.log(`🚫 Key revoked: ${keyId}`);
}

export function isRevoked(keyId: string) {
  return revoked.has(keyId);
}
