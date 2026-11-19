import { constants } from "node:fs";
import { copyFile, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Next.js static exports on Windows can write nested segment filenames.
// Keep those files and add the flat names expected by the client router.
async function publishSegments(routeDir, segmentDir, segmentName) {
  let copied = 0;
  for (const entry of await readdir(segmentDir, { withFileTypes: true })) {
    const source = join(segmentDir, entry.name);
    const flatName = `${segmentName}.${entry.name}`;
    if (entry.isDirectory()) {
      copied += await publishSegments(routeDir, source, flatName);
    } else if (entry.isFile() && entry.name.endsWith(".txt")) {
      const target = join(routeDir, flatName);
      try {
        await copyFile(source, target, constants.COPYFILE_EXCL);
        copied += 1;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        const [existing, incoming] = await Promise.all([readFile(target), readFile(source)]);
        if (!existing.equals(incoming)) throw new Error(`Conflicting static segment: ${target}`);
      }
    }
  }
  return copied;
}

async function normalizeRoutes(directory) {
  let copied = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const child = join(directory, entry.name);
    copied += entry.name.startsWith("__next.")
      ? await publishSegments(directory, child, entry.name)
      : await normalizeRoutes(child);
  }
  return copied;
}

if (process.platform === "win32") {
  const output = fileURLToPath(new URL("../out/", import.meta.url));
  const copied = await normalizeRoutes(output);
  console.log(`Static export: added ${copied} Windows segment aliases.`);
}
