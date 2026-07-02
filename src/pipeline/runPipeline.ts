import { ProductOptimizationEngine } from "@/core/optimization/product-optimization.engine";
import type { AdapterProduct } from "@/adapters/core/adapter.contract";

const optimizer = new ProductOptimizationEngine();

export async function runPipeline(products: AdapterProduct[]) {
  const optimized = await optimizer.optimize(products);

  return {
    success: true,
    data: optimized,
    total: optimized.length,
    timestamp: Date.now(),
  };
}
