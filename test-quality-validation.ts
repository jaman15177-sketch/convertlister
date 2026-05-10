import { getConversionScore } from "./core/scoring/scoring.engine";

const result = getConversionScore({
  width: 400,
  height: 400,
  format: "png",
  hasBackground: false,
  fileSizeKB: 5000,
  marketplace: "amazon"
});

console.log(result);

if (result.grade === "low") {
  console.log("QUALITY VALIDATION WORKING");
}
