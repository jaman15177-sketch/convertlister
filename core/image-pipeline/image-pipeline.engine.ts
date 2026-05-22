type Platform =
  | "SHOPIFY"
  | "AMAZON"
  | "ETSY"
  | "TIKTOK_SHOP"
  | "META";

type ImageAsset = {

  id: string;

  url: string;

  width: number;

  height: number;

  sizeKB: number;

  alt?: string;

  hash?: string;
};

type OptimizedImage = {

  id: string;

  originalUrl: string;

  optimizedUrl: string;

  width: number;

  height: number;

  compressionRatio: number;

  qualityScore: number;

  platformReady: boolean;

  warnings: string[];
};

type ImagePipelineResult = {

  primaryImage: OptimizedImage;

  optimizedAssets: OptimizedImage[];

  duplicateAssets: string[];

  rejectedAssets: string[];

  metadata: {
    engineVersion: string;
    processedAt: string;
  };
};

// ----------------------------------------------------
// MEMORY STORE
// ----------------------------------------------------

const imageHashes = new Set<string>();

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(v: number, min: number, max: number) {

  return Math.max(min, Math.min(max, v));
}

function generateHash(
  image: ImageAsset
): string {

  return `${image.width}_${image.height}_${image.sizeKB}`;
}

// ----------------------------------------------------
// QUALITY ENGINE
// ----------------------------------------------------

function calculateQualityScore(
  image: ImageAsset
): number {

  let score = 50;

  // resolution quality
  if (
    image.width >= 1000 &&
    image.height >= 1000
  ) {
    score += 25;
  }

  // file size quality
  if (
    image.sizeKB > 100 &&
    image.sizeKB < 3000
  ) {
    score += 15;
  }

  // aspect quality
  const ratio =
    image.width / image.height;

  if (ratio >= 0.8 && ratio <= 1.5) {
    score += 10;
  }

  return clamp(score, 0, 100);
}

// ----------------------------------------------------
// PLATFORM DIMENSIONS
// ----------------------------------------------------

function platformDimensions(
  platform: Platform
) {

  switch (platform) {

    case "AMAZON":
      return { width: 2000, height: 2000 };

    case "SHOPIFY":
      return { width: 1600, height: 1600 };

    case "ETSY":
      return { width: 2000, height: 1500 };

    case "TIKTOK_SHOP":
      return { width: 1080, height: 1920 };

    case "META":
      return { width: 1080, height: 1080 };

    default:
      return { width: 1200, height: 1200 };
  }
}

// ----------------------------------------------------
// OPTIMIZATION ENGINE
// ----------------------------------------------------

function optimizeImage(
  image: ImageAsset,
  platform: Platform
): OptimizedImage {

  const target =
    platformDimensions(platform);

  const quality =
    calculateQualityScore(image);

  const warnings: string[] = [];

  if (quality < 60) {
    warnings.push(
      "Low image quality"
    );
  }

  if (image.sizeKB > 5000) {
    warnings.push(
      "Image file size too large"
    );
  }

  if (
    image.width < 800 ||
    image.height < 800
  ) {
    warnings.push(
      "Resolution too low"
    );
  }

  return {

    id: image.id,

    originalUrl: image.url,

    optimizedUrl:
      `${image.url}?optimized=true`,

    width: target.width,

    height: target.height,

    compressionRatio: 0.72,

    qualityScore: quality,

    platformReady:
      warnings.length === 0,

    warnings,
  };
}

// ----------------------------------------------------
// DUPLICATE DETECTION
// ----------------------------------------------------

function isDuplicate(
  image: ImageAsset
): boolean {

  const hash =
    image.hash ||
    generateHash(image);

  if (imageHashes.has(hash)) {
    return true;
  }

  imageHashes.add(hash);

  return false;
}

// ----------------------------------------------------
// PRIMARY IMAGE RANKING
// ----------------------------------------------------

function rankPrimaryImage(
  assets: OptimizedImage[]
): OptimizedImage {

  return assets.sort(
    (a, b) =>
      b.qualityScore -
      a.qualityScore
  )[0];
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function imagePipelineEngine(
  images: ImageAsset[],
  platform: Platform
): ImagePipelineResult {

  const optimizedAssets: OptimizedImage[] = [];

  const duplicateAssets: string[] = [];

  const rejectedAssets: string[] = [];

  for (const image of images) {

    // duplicate detection
    if (isDuplicate(image)) {

      duplicateAssets.push(image.id);

      continue;
    }

    // hard rejection
    if (
      image.width < 400 ||
      image.height < 400
    ) {

      rejectedAssets.push(image.id);

      continue;
    }

    const optimized =
      optimizeImage(
        image,
        platform
      );

    optimizedAssets.push(
      optimized
    );
  }

  // primary image selection
  const primaryImage =
    rankPrimaryImage(
      optimizedAssets
    );

  return {

    primaryImage,

    optimizedAssets,

    duplicateAssets,

    rejectedAssets,

    metadata: {

      engineVersion:
        "v2-image-pipeline-final",

      processedAt:
        new Date().toISOString(),
    },
  };
}
