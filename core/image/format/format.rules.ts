import { ImageFormat } from "./format.types";

export function getBestFormat(
  marketplace: string,
  hasTransparency: boolean,
  priority: string = "balanced"
): ImageFormat {

  // 🥇 AVIF = BEST compression, modern browsers
  if (priority === "quality") {
    return "avif";
  }

  // 🥈 TRANSPARENCY cases
  if (hasTransparency) {
    return "webp";
  }

  // 🥉 MARKETPLACE rules

  switch (marketplace) {

    case "amazon":
      return "jpg"; // compatibility first

    case "shopify":
      return "webp"; // balanced

    case "etsy":
      return "jpg"; // SEO + compatibility

    case "tiktok":
      return "webp"; // fast load

    default:
      return "webp";
  }
}
