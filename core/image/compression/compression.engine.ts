import { CompressionInput, CompressionOutput } from "./compression.types";
import { detectQuality } from "./quality.detector";
import { getResize } from "./size.strategy";

export function getCompressionStrategy(input: CompressionInput): CompressionOutput {

  const quality = detectQuality(input);
  const resize = getResize(input);

  // FORMAT DECISION
  let format: "webp" | "jpg" | "png" = "webp";

  if (input.marketplace === "etsy") {
    format = "jpg";
  }

  if (input.marketplace === "tiktok") {
    format = "webp";
  }

  return {
    quality,
    format,
    resize
  };
}
