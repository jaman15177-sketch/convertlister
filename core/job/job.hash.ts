import crypto from "crypto"

export function createUrlHash(url: string) {

  return crypto
    .createHash("sha256")
    .update(url)
    .digest("hex")
}
