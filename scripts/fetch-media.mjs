/**
 * Pulls the generated frames into assets/media and the clips into public/media.
 *
 *   node scripts/fetch-media.mjs
 *
 * The files come from the Higgsfield CDN. If the network you run this on
 * blocks that host you will get a tunnel/403 error — allow
 * d8j0ntlcm91z4.cloudfront.net or download the files by hand into the paths
 * listed below.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FMctR3yJ9zg7GO6UOsPFdN4U6N";
const A = "hf_20260810_224441";
const B = "hf_20260810_224532";
const V = "hf_20260810_224717";

const ASSETS = [
  ["media/menu/chicken-classic.png", `${A}_c9957ad3-4410-4dc8-9b7a-4c790a60ad26.png`],
  ["media/menu/charcoal-beef.png", `${A}_83d97522-2066-4e7b-b3e5-d23ee69235bb.png`],
  ["media/menu/chili-lamb.png", `${A}_747f3056-0bae-4e05-b0a4-ca292e553bd4.png`],
  ["media/menu/lu-fire.png", `${A}_c086830a-cf8b-4d7c-8176-f59f98510c48.png`],
  ["media/menu/double-meat.png", `${A}_ab2ed70e-4fb5-43b7-a86e-bc0ebd59abd5.png`],
  ["media/menu/bowl.png", `${A}_440d1d29-dab6-49cc-991c-66e5c73834e2.png`],
  ["media/menu/falafel.png", `${A}_67e51f79-53bd-480d-8df9-f3490bdf9902.png`],
  ["media/menu/halloumi.png", `${A}_6951b173-75f6-474f-b6da-0defdf3117bc.png`],
  ["media/process/1-marinade.png", `${A}_b95ba1ec-0bb1-4181-90e8-3a71f9cd1ad1.png`],
  ["media/process/2-spit.png", `${A}_996fc9e6-628d-406c-9743-c14fd02c0015.png`],
  ["media/process/3-flatbread.png", `${A}_fca946fa-3b5f-43e2-a641-3134e07e49d8.png`],
  ["media/process/4-assembly.png", `${A}_916ed371-58b3-48e2-aa04-0962bb53a25d.png`],
  ["media/counter.png", `${B}_8ec6d8dc-3b4e-4099-a8ba-c0a07d26e2b8.png`],
  ["media/hero-spit.png", `${B}_05dc8c58-008b-4b2c-8ef1-0c485ae1962f.png`],
  ["media/slicing.png", `${B}_14ebc155-370a-4147-b2ed-8961fbd383e0.png`],
  ["media/hero-spit.mp4", `${V}_5eee255d-1b83-42e3-b816-a42c5780229a.mp4`],
  ["media/slicing.mp4", `${V}_f50dd383-9587-4afc-ad3b-6c60d07cd7dc.mp4`],
];

let failed = 0;

for (const [target, remote] of ASSETS) {
  const path = target.endsWith(".mp4")
    ? join("public", target)
    : join("assets", target);
  try {
    const response = await fetch(`${CDN}/${remote}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, Buffer.from(await response.arrayBuffer()));
    console.log("ok  ", target);
  } catch (error) {
    failed += 1;
    console.error("fail", target, "—", error.message);
  }
}

console.log(
  failed ? `\n${failed}/${ASSETS.length} failed.` : `\nAll ${ASSETS.length} in place.`,
);
process.exit(failed ? 1 : 0);
