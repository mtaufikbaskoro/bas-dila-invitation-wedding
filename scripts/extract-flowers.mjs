import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("stitch-design/flowers.jpg");
const outputDirectory = path.resolve("public/assets/flowers");
const crops = [
  ["bouquet", { left: 120, top: 290, width: 1220, height: 1370 }],
  ["pink-sprigs", { left: 1510, top: 300, width: 520, height: 430 }],
  ["orange-sprig", { left: 2050, top: 300, width: 390, height: 430 }],
  ["upper-foliage", { left: 2380, top: 290, width: 550, height: 460 }],
  ["middle-flowers", { left: 1480, top: 760, width: 1160, height: 420 }],
  ["lower-foliage", { left: 1460, top: 1160, width: 1460, height: 530 }],
];

async function extract(name, region) {
  const rgba = await sharp(source)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < rgba.data.length; index += 4) {
    const whiteness = Math.min(rgba.data[index], rgba.data[index + 1], rgba.data[index + 2]);
    const alpha = Math.max(0, Math.min(255, (255 - whiteness) * 8));
    rgba.data[index + 3] = Math.min(rgba.data[index + 3], alpha);
  }

  await sharp(rgba.data, {
    raw: { width: rgba.info.width, height: rgba.info.height, channels: 4 },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(outputDirectory, `${name}.png`));
}

fs.mkdirSync(outputDirectory, { recursive: true });
Promise.all(crops.map(([name, region]) => extract(name, region)))
  .then(() => console.log(`Extracted ${crops.length} transparent flower PNGs.`))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });