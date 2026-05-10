import sharp from "sharp";

export async function processImage(item: any): Promise<string> {

  const outputPath = `output_${item.id}.webp`;

  await sharp(item.input)
    .resize(2000)
    .toFormat("webp", { quality: 85 })
    .toFile(outputPath);

  return outputPath;
}
