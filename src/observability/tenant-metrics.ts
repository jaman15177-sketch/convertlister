const metricsStore = new Map<string, number>();

/**
 * ==========================================================
 * TENANT METRICS TRACKING
 * ==========================================================
 */

export function incTenantMetric(organizationId: string) {
  const current = metricsStore.get(organizationId) || 0;
  metricsStore.set(organizationId, current + 1);
}

export function getTenantMetrics() {
  return Object.fromEntries(metricsStore);
}

