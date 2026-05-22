import { ServiceNode } from "./types";

export async function healthCheck(
  node: ServiceNode
): Promise<boolean> {
  console.log(
    `🩺 Checking health for ${node.name}:${node.id}`
  );

  /**
   * Real system:
   * - HTTP probe
   * - Kubernetes readiness probe
   * - Envoy metrics
   */

  return node.healthy;
}
