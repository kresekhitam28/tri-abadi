import { readdirSync } from "node:fs";
import { basename, join } from "node:path";

export function getProjectImageFiles(projects) {
  const gallery = join(process.cwd(), "public", "proyek");
  const names = new Set(projects.map(({ src }) => basename(src)));
  const variant = /-(320|640)\.webp$/;

  return {
    variants: readdirSync(gallery).filter((name) => variant.test(name) && names.has(name.replace(variant, ".webp"))),
    thumbnails: readdirSync(join(gallery, "thumbs")).filter((name) => names.has(name)),
  };
}
