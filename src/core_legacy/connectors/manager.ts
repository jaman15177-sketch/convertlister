import { connectorRegistry } from "./registry";
import { RawProduct } from "./types";

class ConnectorManager {
  /**
   * Fetch from single source
   */
  async fetchFromSource(
    source: string
  ): Promise<RawProduct[]> {
    const connector =
      connectorRegistry.get(source);

    if (!connector) {
      throw new Error(
        `Connector not found: ${source}`
      );
    }

    return await connector.fetchProducts();
  }

  /**
   * Fetch from ALL sources
   */
  async fetchAll(): Promise<
    RawProduct[]
  > {
    const connectors =
      connectorRegistry.getAll();

    const results = await Promise.all(
      connectors.map((c) =>
        c.fetchProducts()
      )
    );

    return results.flat();
  }
}

export const connectorManager =
  new ConnectorManager();
