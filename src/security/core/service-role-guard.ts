export function blockServiceRoleUsage(context: {
  role?: string;
  path: string;
}) {
  const isServiceRole = context.role === "service_role";

  if (isServiceRole && process.env.NODE_ENV === "production") {
    console.error("🚨 SERVICE ROLE ACCESS BLOCKED:", context.path);
    throw new Error("SERVICE_ROLE_BLOCKED");
  }
}
