export type Role = "ADMIN" | "MANAGER" | "USER";

export function hasRole(userRole: Role, allowed: Role[]) {
  return allowed.includes(userRole);
}
