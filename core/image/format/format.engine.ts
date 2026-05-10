import { getBestFormat } from "./format.rules";
import { FormatInput, ImageFormat } from "./format.types";

export function formatDecision(input: FormatInput): ImageFormat {

  return getBestFormat(
    input.marketplace,
    input.hasTransparency,
    input.priority || "balanced"
  );
}
