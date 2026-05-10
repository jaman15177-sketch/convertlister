import { ImageMeta } from "./scoring.types";

export function calculateClarity(meta: ImageMeta): number {
  const pixels = meta.width * meta.height;

  if (pixels > 4000000) return 100;
  if (pixels > 2000000) return 80;
  if (pixels > 1000000) return 60;

  return 40;
}

export function calculateFormat(meta: ImageMeta): number {
  if (meta.format === "webp") return 100;
  if (meta.format === "jpg") return 80;
  return 60;
}

export function calculateBackground(meta: ImageMeta): number {
  return meta.hasBackground ? 100 : 70;
}

export function calculateSize(meta: ImageMeta): number {
  if (meta.fileSizeKB < 500) return 100;
  if (meta.fileSizeKB < 1500) return 80;
  if (meta.fileSizeKB < 3000) return 60;
  return 40;
}
