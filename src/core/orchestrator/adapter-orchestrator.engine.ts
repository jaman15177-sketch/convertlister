import { AdapterRegistry } from "@/core/registry/adapter.registry";import type { AdapterQuery, AdapterProduct, AdapterResult } from "@/adapters/core/adapter.contract";

export class AdapterOrchestratorEngine {
  /**
   * Decide which adapter should handle request
   */
  static resolveAdapter(query: AdapterQuery): string {
    const keyword = query.keyword.toLowerCase();

    if (keyword.includes("amazon")) return "amazon";
    if (keyword.includes("aliexpress")) return "aliexpress";
    if (keyword.includes("shopify")) return "shopify";

    return "custom-market";
  }

  /**
   * Main execution pipeline
   */
  static async run(
    query: AdapterQuery
  ): Promise<AdapterResult<AdapterProduct[]>> {

    const adapterName = this.resolveAdapter(query);

    return AdapterRegistry.execute(adapterName, query);
  }
}
