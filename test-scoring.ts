import { getConversionScore } from "./core/scoring/scoring.engine";

const result = getConversionScore({
  width: 2000,
  height: 2000,
  format: "webp",
  hasBackground: true,
  fileSizeKB: 450,
  marketplace: "amazon"
});

console.log(result);
