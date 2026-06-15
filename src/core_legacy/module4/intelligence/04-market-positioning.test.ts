import {
  marketPositioningEngine,
} from "./04-market-positioning.engine";

import {
  ProductInput,
  ProductProfile,
} from "../00-interfaces";

const product: ProductInput = {
  productId: "p1",
  source: "amazon",
  title: "Portable Wireless LED Lamp",
  description:
    "Smart rechargeable lamp for home use",
  price: 29,
  category: "home",
};

const profile: ProductProfile = {
  productId: "p1",
  title: product.title,
  category: "home",
  features: [
    "wireless",
    "portable",
    "smart",
    "usb",
  ],
  benefits: [
    "easy usage",
    "energy saving",
  ],
  audience: ["home users"],
  uniqueSellingPoints: [
    "no wire dependency",
  ],
};

const result =
  marketPositioningEngine.analyze(
    product,
    profile
  );

console.log(
  JSON.stringify(result, null, 2)
);
