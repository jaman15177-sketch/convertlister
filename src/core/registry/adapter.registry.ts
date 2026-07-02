import type { AdapterContract, AdapterQuery, AdapterResult, AdapterProduct } from "@/adapters/core/adapter.contract";

export class AdapterRegistry {
  private static adapters: Map<string, AdapterContract<any, any>> = new Map();

  static register(adapter: AdapterContract<any, any>) {
    this.adapters.set(adapter.name, adapter);
  }

  static get(name: string) {
    return this.adapters.get(name);
  }

  static list(): string[] {
    return Array.from(this.adapters.keys());
  }

  static async execute<Q extends AdapterQuery>(
    name: string,
    input: Q
  ): Promise<AdapterResult<AdapterProduct[]>> {
    const adapter = this.adapters.get(name);

    if (!adapter) {
      return {
        success: false,
        data: [],
        source: name,
        timestamp: Date.now(),
        error: "Adapter not found",
      };
    }

    const normalized = adapter.transform(input);
    return adapter.execute(normalized);
  }
}
