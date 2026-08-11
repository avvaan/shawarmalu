/**
 * Static-export image loader.
 *
 * There is no server to resize anything, so scripts/build-images.mjs writes a
 * ladder of widths into /img at build time and this maps next/image's request
 * onto the nearest one. Keep WIDTHS in step with that script and with
 * deviceSizes/imageSizes in next.config.ts.
 */

const WIDTHS = [192, 384, 640, 960, 1440, 1920];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const name = src.replace(/^\/media\//, "").replace(/\.webp$/, "");
  return `/img/${name}-${target}.webp`;
}
