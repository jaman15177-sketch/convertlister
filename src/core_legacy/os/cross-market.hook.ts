import { crossMarketMergeEngine } from "../graph/cross-market-merge.engine";

export function mergeIntoGlobalGraph(product: {
  source: string;
  id: string;
  title: string;
  price: number;
}) {
  return crossMarketMergeEngine.merge(product);
}
