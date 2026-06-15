import {
  customerPsychologyEngine,
} from "./03-customer-psychology.engine";

import {
  ProductInput,
} from "../00-interfaces";

const input: ProductInput = {
  productId: "p1",
  source: "amazon",
  title:
    "Limited Time Discount Smart LED Lamp",
  description:
    "Buy now and get premium wireless rechargeable lighting with free shipping",
  price: 29,
  category: "home",
};

const result =
  customerPsychologyEngine.analyze(
    input
  );

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
