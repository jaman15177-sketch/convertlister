import { connectorRegistry } from "./registry";
import { ShopifyConnector } from "./shopify.connector";

/**
 * ==========================================================
 * CONNECTOR SYSTEM BOOTSTRAP
 * ==========================================================
 */

export function initConnectors() {
  connectorRegistry.register(
    new ShopifyConnector()
  );

  // Future:
  // connectorRegistry.register(new AmazonConnector())
  // connectorRegistry.register(new AliExpressConnector())

  console.log("🌐 Connector System Ready");
}
