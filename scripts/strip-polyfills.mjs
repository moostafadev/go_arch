import { readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const chunksDir = ".next/static/chunks";
const entries = await readdir(chunksDir);

for (const entry of entries) {
  if (!entry.startsWith("polyfills-") || !entry.endsWith(".js")) continue;

  const filePath = join(chunksDir, entry);
  const { size } = await stat(filePath);

  if (size > 1024) {
    await writeFile(filePath, "");
    console.log(`emptied ${entry} (was ${(size / 1024).toFixed(1)} KiB)`);
  }
}
