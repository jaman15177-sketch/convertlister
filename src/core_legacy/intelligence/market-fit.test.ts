import { marketFitDetector } from "./market-fit.detector";

const result = marketFitDetector.detect({
  title: "Wireless Portable LED Pet Water Fountain",
  category: "pet",
  price: 29.99,
  imagesCount: 6,
  descriptionLength: 1200,
});

console.log(JSON.stringify(result, null, 2));
