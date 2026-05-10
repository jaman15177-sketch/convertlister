import { CompressionInput } from "./compression.types";

export function detectQuality(input: CompressionInput): number {

  const pixels = input.width * input.height;

  // HIGH QUALITY IMAGE
  if (pixels > 4000000) return 85;

  // MEDIUM
  if (pixels > 1500000) return 75;

  // LOW
  return 65;
}
