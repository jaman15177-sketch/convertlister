export class AdapterRegistry {

  private adapters: Record<string, any> = {};

  register(name: string, adapter: any) {
    this.adapters[name] = adapter;
  }

  get(name: string) {

    const adapter = this.adapters[name];

    if (!adapter) {
      throw new Error(`Adapter not found: ${name}`);
    }

    return adapter;
  }
}
