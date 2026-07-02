/**
 * ==========================================================
 * REDIS TENANT ISOLATION
 * ==========================================================
 */

export function organizationKey(
  organizationId: string,
  key: string
): string {
  return `organization:${organizationId}:${key}`;
}
