import crypto from "crypto";

const MASTER_KEY = crypto
  .createHash("sha256")
  .update(process.env.KMS_MASTER_KEY || "dev-key")
  .digest();

export function encrypt(data: string) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    MASTER_KEY,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    data: encrypted.toString("hex"),
  };
}

export function decrypt(payload: any) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    MASTER_KEY,
    Buffer.from(payload.iv, "hex")
  );

  decipher.setAuthTag(
    Buffer.from(payload.tag, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(
      Buffer.from(payload.data, "hex")
    ),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
