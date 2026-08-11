/**
 * Builds the responsive image ladder for the static export.
 *
 *   node scripts/build-images.mjs
 *
 * A static host cannot resize on request, so every frame in assets/media is
 * written out at each width in WIDTHS into public/img. lib/imageLoader.ts picks
 * from exactly this list — change one, change both.
 *
 * Runs as part of `npm run build`. Output is generated, not committed.
 */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const SOURCE = "assets/media";
const OUT = "public/img";
const WIDTHS = [192, 384, 640, 960, 1440, 1920];
const QUALITY = 80;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else if (extname(entry.name).toLowerCase() === ".webp") found.push(path);
  }
  return found;
}

const sources = await walk(SOURCE);
let written = 0;
let bytes = 0;

for (const source of sources) {
  const name = relative(SOURCE, source).replace(/\.webp$/i, "");

  for (const width of WIDTHS) {
    const target = join(OUT, `${name}-${width}.webp`);
    await mkdir(dirname(target), { recursive: true });

    // withoutEnlargement keeps a 1856px source from being blown up to 1920:
    // the file still exists under that name, it is just its own size.
    const buffer = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    await writeFile(target, buffer);
    written += 1;
    bytes += buffer.length;
  }
}

console.log(
  `images: ${written} files from ${sources.length} sources, ${(
    bytes / 1e6
  ).toFixed(1)} MB total`,
);

// A missing ladder silently ships broken images, so fail the build loudly.
if (!sources.length) {
  console.error("No sources in assets/media — run scripts/fetch-media.mjs");
  process.exit(1);
}

await stat(OUT);
