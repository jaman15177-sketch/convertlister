import {
  productUnderstandingEngine,
} from "./01-product-understanding.engine";

const result =
  productUnderstandingEngine.analyze(
    {
      productId: "p1",
      source: "amazon",
      title:
        "Portable Wireless LED Lamp",
      description:
        "Rechargeable smart lamp with USB charging",
      price: 29.99,
      category: "home",
    }
  );

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
