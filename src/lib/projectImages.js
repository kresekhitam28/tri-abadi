import { readdirSync } from "node:fs";
import { basename, join } from "node:path";
import sharp from "sharp";

export async function getProjectImageFiles(projects) {
  const gallery = join(process.cwd(), "public", "proyek");
  const names = new Set(projects.map(({ src }) => basename(src)));
  const variant = /-(320|640)\.webp$/;
  const variantNames = readdirSync(gallery).filter(
    (name) => variant.test(name) && names.has(name.replace(variant, ".webp")),
  );
  const variants = Object.fromEntries(await Promise.all(variantNames.map(async (name) => {
    const { width } = await sharp(join(gallery, name)).metadata();
    return [name, width];
  })));
  let thumbnails;
  try {
    thumbnails = readdirSync(join(gallery, "thumbs")).filter((name) => names.has(name));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    thumbnails = [];
  }

  return {
    variants,
    thumbnails,
  };
}
