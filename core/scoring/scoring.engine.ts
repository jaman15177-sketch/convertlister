import { ImageMeta, ScoreResult } from "./scoring.types";
import { marketplaceWeights } from "./marketplace.weights";
import {
  calculateClarity,
  calculateFormat,
  calculateBackground,
  calculateSize
} from "./scoring.rules";

export function getConversionScore(meta: ImageMeta): ScoreResult {

  const weights = marketplaceWeights[meta.marketplace];

  const clarity = calculateClarity(meta);
  const format = calculateFormat(meta);
  const background = calculateBackground(meta);
  const size = calculateSize(meta);

  const score =
    clarity * weights.clarity +
    format * weights.format +
    background * weights.background +
    size * weights.size;

  let grade: ScoreResult["grade"] = "low";

  if (score > 85) grade = "premium";
  else if (score > 70) grade = "high";
  else if (score > 50) grade = "medium";

  return {
    score: Math.round(score),
    grade,
    reasons: [
      `clarity: ${clarity}`,
      `format: ${format}`,
      `background: ${background}`,
      `size: ${size}`
    ]
  };
}
