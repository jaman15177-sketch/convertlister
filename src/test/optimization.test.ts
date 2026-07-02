import { ProductOptimizationEngine } from "../core/optimization/product-optimization.engine";

const engine = new ProductOptimizationEngine();
const mockProducts = [
  {
    id: "1",
    title: "iPhone 15 Pro",
    price: 999,
    currency: "USD",
    source: "test",
    metadata: { rating: 4.8, reviews: 5000 }
  },
  {
    id: "2",
    title: "Cheap Cable",
    price: 2,
    currency: "USD",
    source: "test",
    metadata: { rating: 3.2, reviews: 10 }
  }
];

const result = engine.optimize(mockProducts);

console.log(JSON.stringify(result, null, 2));
