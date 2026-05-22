export async function rollback(
  service: string
) {
  console.log(
    `↩️ Rolling back deployment for ${service}`
  );

  /**
   * Real systems:
   * - Kubernetes rollout undo
   * - Argo rollback
   * - traffic switching
   */
}
