/**
 * Turns the 2K PNGs from Higgsfield into WebP and builds the Open Graph card.
 *
 *   node scripts/optimize-media.mjs
 *
 * next/image re-encodes on delivery anyway, so multi-megabyte PNG sources buy
 * nothing and cost repository weight forever. Run this once after
 * fetch-media.mjs; it is idempotent and skips anything already converted.
 */

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/media";
const QUALITY = 82;

/** Sources that are only ever used as a video poster or as the OG card. */
const UNUSED = ["process/2-spit.png"];

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else if (extname(entry.name).toLowerCase() === ".png") found.push(path);
  }
  return found;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const relative of UNUSED) {
  try {
    await unlink(join("public/media", relative));
    console.log("drop  ", relative, "(unused)");
  } catch {
    /* already gone */
  }
}

const sources = await walk(ROOT);
let before = 0;
let after = 0;

for (const source of sources) {
  const target = source.replace(/\.png$/i, ".webp");
  const original = (await stat(source)).size;

  await sharp(source).webp({ quality: QUALITY, effort: 5 }).toFile(target);

  const converted = (await stat(target)).size;
  await unlink(source);

  before += original;
  after += converted;
  console.log(
    "webp  ",
    target.replace("public/", ""),
    `${kb(original)} → ${kb(converted)}`,
  );
}

// Open Graph wants a small, fixed 1.91:1 card, not the full-resolution frame.
const ogSource = "public/media/hero-spit.webp";
await sharp(ogSource)
  .resize(1200, 630, { fit: "cover", position: "right" })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/og.jpg");

const og = (await stat("public/og.jpg")).size;
console.log("og    ", `og.jpg ${kb(og)}`);

if (sources.length) {
  console.log(
    `\n${sources.length} files: ${(before / 1e6).toFixed(1)} MB → ${(
      after / 1e6
    ).toFixed(1)} MB`,
  );
} else {
  console.log("\nNothing to convert — already WebP.");
}
