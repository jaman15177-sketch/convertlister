import { AdapterRegistry } from "@/core/registry/adapter.registry";
import { CustomMarketAdapter } from "@/adapters/custom/custom-market.adapter";
// register adapters once globally
export function bootstrap() {
  AdapterRegistry.register(new CustomMarketAdapter());
}

bootstrap();
