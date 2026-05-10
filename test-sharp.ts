import sharp from "sharp";

async function test() {
  await sharp("input.jpg")
    .resize(800)
    .webp({ quality: 80 })
    .toFile("output.webp");

  console.log("Sharp working OK");
}

test();
