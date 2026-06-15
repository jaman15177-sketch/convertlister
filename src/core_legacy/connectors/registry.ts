import { IConnector } from "./types";

class ConnectorRegistry {
  private connectors: Map<
    string,
    IConnector
  > = new Map();

  /**
   * Register new marketplace connector
   */
  register(connector: IConnector) {
    this.connectors.set(
      connector.name,
      connector
    );
  }

  /**
   * Get connector by name
   */
  get(name: string) {
    return this.connectors.get(name);
  }

  /**
   * Get all connectors
   */
  getAll() {
    return Array.from(
      this.connectors.values()
    );
  }

  /**
   * Check availability
   */
  has(name: string) {
    return this.connectors.has(name);
  }
}

export const connectorRegistry =
  new ConnectorRegistry();
