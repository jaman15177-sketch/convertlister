import {
  keywordIntelligenceEngine,
} from "./02-keyword-intelligence.engine";

import {
  ProductInput,
} from "../00-interfaces";

const input: ProductInput = {
  productId: "p1",
  source: "amazon",
  title:
    "Portable Wireless LED Lamp",
  description:
    "Smart rechargeable lamp with USB charging",
  price: 29,
  category: "home",
};

const result =
  keywordIntelligenceEngine.analyze(
    input
  );

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
