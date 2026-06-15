import {
  profitabilityEngine,
} from "./profitability.engine";

const result =
  profitabilityEngine.calculate({
    sellingPrice: 49.99,

    productCost: 12,

    shippingCost: 4,

    adCost: 8,

    packagingCost: 1.5,
  });

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
