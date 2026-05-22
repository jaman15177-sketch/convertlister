import fs from "fs/promises";

export async function auditLog(event: any) {
  await fs.appendFile(
    "./enterprise-secrets/audit/audit.log",
    JSON.stringify(event) + "\n"
  );
}
