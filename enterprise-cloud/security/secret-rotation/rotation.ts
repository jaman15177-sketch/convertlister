import crypto from "crypto";
import fs from "fs/promises";

type SecretRecord = {
  name: string;
  value: string;
  rotatedAt: string;
};

/**
 * Generate secure random secret
 */
function generateSecret(length = 64): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Rotate secret
 */
export async function rotateSecret(secretName: string) {
  const newSecret = generateSecret(32);

  const record: SecretRecord = {
    name: secretName,
    value: newSecret,
    rotatedAt: new Date().toISOString(),
  };

  /**
   * Example local persistence
   * In production:
   * - HashiCorp Vault
   * - AWS Secrets Manager
   * - GCP Secret Manager
   */

  await fs.writeFile(
    `./secrets/${secretName}.json`,
    JSON.stringify(record, null, 2)
  );

  console.log(`🔄 Secret rotated: ${secretName}`);

  return record;
}

/**
 * Example runner
 */
async function main() {
  await rotateSecret("jwt-signing-key");
}

main();
