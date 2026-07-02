export function assertNoServiceRoleUsage(req: any): void {
  const url = req.url || "";

  const forbiddenPaths = [
    "/api/admin",
    "/api/internal",
    "/api/root",
  ];

  for (const path of forbiddenPaths) {
    if (url.startsWith(path)) {
      throw new Error("FORBIDDEN_ADMIN_PATH");
    }
  }
}
