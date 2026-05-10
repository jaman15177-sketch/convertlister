import { MarketplacePlugin } from "../interface/marketplace.plugin";

export class PluginRegistry {
  private static plugins: Record<string, MarketplacePlugin> = {};

  static register(plugin: MarketplacePlugin) {
    this.plugins[plugin.name] = plugin;
  }

  static get(name: string) {
    return this.plugins[name];
  }

  static list() {
    return Object.keys(this.plugins);
  }
}
