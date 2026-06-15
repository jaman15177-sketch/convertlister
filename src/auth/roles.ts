export type Role = "owner" | "admin" | "member" | "viewer";

export const permissions: Record<Role, string[]> = {
  owner: ["*"],
  admin: ["read", "write", "manage_users"],
  member: ["read", "write"],
  viewer: ["read"],
};

export function hasPermission(role: Role, action: string) {
  const allowed = permissions[role];

  if (!allowed) return false;

  return allowed.includes("*") || allowed.includes(action);
}
