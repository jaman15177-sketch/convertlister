import { MARKETPLACE_REGISTRY } from "./marketplace.registry";

export class MarketplaceEngine {
  getBehavior(name: string) {
    return (
      MARKETPLACE_REGISTRY[
        name as keyof typeof MARKETPLACE_REGISTRY
      ] || MARKETPLACE_REGISTRY.amazon
    );
  }
}
