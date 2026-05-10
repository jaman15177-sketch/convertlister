import { runExport } from "./core/export/export.engine";

const products = [
  {
    id: "1",
    title: "Premium Bottle",
    price: 25,
    marketplace: "amazon",
    image: "bottle.webp"
  }
];

const result = runExport(products);

console.log(result);
