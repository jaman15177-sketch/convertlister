import {
  marketSaturationEngine,
} from "./market-saturation.engine";

import { ProductInput } from "../00-interfaces";

const product: ProductInput = {
  productId: "p1",
  source: "amazon",
  title: "Portable Wireless LED Lamp",
  description:
    "Smart rechargeable lamp for home use",
  price: 29,
};

const result =
  marketSaturationEngine.analyze(product);

console.log(
  JSON.stringify(result, null, 2)
);
