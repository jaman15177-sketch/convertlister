import fs from "fs/promises";

export async function audit(event: any) {
  await fs.appendFile(
    "./zero-trust-platform/reload/reload-audit.log",
    JSON.stringify(event) + "\n"
  );
}
